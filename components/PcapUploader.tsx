"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDataContext } from "./context/DataContext";

// Define the type for the form values
export interface FormValues {
  file: File | null;
}

// Define the return type of the function
export interface SubmitResult {
  fileError: string;
}

export function useCreateSubmitHandler(
  setFileError: React.Dispatch<React.SetStateAction<string>>
) {
  const router = useRouter();
  const { setData } = useDataContext();

  const onSubmit = async (values: FormValues): Promise<SubmitResult> => {
    setFileError("");
    const file = values.file;

    if (!file) {
      setFileError("Please select a file.");
      return { fileError: "Please select a file." };
    }

    // Check file extension
    if (!file.name.toLowerCase().endsWith(".pcap")) {
      setFileError("Invalid file type. Please select a .pcap file.");
      return { fileError: "Invalid file type. Please select a .pcap file." };
    }

    // Check file content (magic numbers)
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    const magicNumber = uint8Array.slice(0, 4);
    const validMagicNumbers = [
      [0xd4, 0xc3, 0xb2, 0xa1], // Little-endian
      [0xa1, 0xb2, 0xc3, 0xd4], // Big-endian
      [0x0a, 0x0d, 0x0d, 0x0a], // PCAPNG
    ];

    if (
      !validMagicNumbers.some((valid) =>
        valid.every((byte, i) => byte === magicNumber[i])
      )
    ) {
      setFileError("Invalid PCAP file content.");
      return { fileError: "Invalid PCAP file content." };
    }

    // If all client-side checks pass, prepare to send to server
    console.log("File is valid. Sending to server...");

    try {
      // Upload the file to the server
      const formData = new FormData();
      formData.append("file", file);

      // Encode the current date to Base64
      const date = new Date().toISOString();
      const encodedDate = btoa(date);

      const response = await fetch("http://localhost:8000/pcap-default", {
        method: "POST",
        body: formData,
        headers: {
          "X-Date-Encoded": encodedDate,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const { unique_id } = await response.json();

      // Establish WebSocket connection using the unique ID
      const socket = new WebSocket(`ws://localhost:8000/ws/${unique_id}`);

      socket.onopen = function () {
        console.log("WebSocket connection opened.");
      };

      let receivedData = "";

      socket.onmessage = function (event) {
        if (event.data === "EOF") {
          console.log("All data received.");
          socket.close();
          // Save data to context
          setData(JSON.parse(receivedData));
          // Redirect to results page
          router.push(`/result/${unique_id}`); // Use the unique identifier
        } else {
          console.log("Received data chunk:", event.data);
          receivedData += event.data; // Accumulate chunks
        }
      };

      socket.onerror = function (error) {
        console.error("WebSocket error observed:", error);
        setFileError("Error processing PCAP file.");
      };

      socket.onclose = function () {
        console.log("WebSocket connection closed.");
      };

      return { fileError: "" };
    } catch (error) {
      console.error("Error processing PCAP file:", error);
      setFileError("Error processing PCAP file.");
      return { fileError: "Error processing PCAP file." };
    }
  };

  return onSubmit;
}

"use client";

// Define the type for the form values
export interface FormValues {
  file: File | null;
}

// Define the return type of the function
export interface SubmitResult {
  fileError: string;
}

export function createSubmitHandler(setFileError: (error: string) => void) {
  return async function onSubmit(values: FormValues): Promise<SubmitResult> {
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
    console.log(file);
    console.log(uint8Array);
    console.log(magicNumber);
    console.log(validMagicNumbers);
    console.log(file.type);
    console.log(file.size);
    console.log(file.name);

    return { fileError: "" };
  };
}

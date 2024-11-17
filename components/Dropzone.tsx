"use client";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface DropzoneProps {
  onChange: (file: File | null) => void;
  value?: File | null;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onChange }) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    accept: {
      "application/vnd.tcpdump.pcap": [".pcap"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 104857600, // 100 MB
    onDrop: (incomingFiles) => {
      if (hiddenInputRef.current) {
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
        onChange(incomingFiles[0]);
      }
    },
  });

  const files = acceptedFiles.map((file) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const lastModified = new Date(file.lastModified).toLocaleString();
    return (
      <li key={file.path}>
        {file.name} - {sizeInMB} MB <br />
        last modified: {lastModified}
      </li>
    );
  });

  return (
    <div className="container">
      <div
        {...getRootProps({
          className:
            "border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer",
        })}
      >
        <Input {...getInputProps()} />
        <Input
          type="file"
          name="file"
          accept=".pcap"
          style={{ display: "none" }}
          ref={hiddenInputRef}
        />
        <div className="text-center">
          <div className="text-center text-muted-foreground">
            <p>Drag and drop a PCAP file here, or click to select a file</p>
            <em>(Only *.pcap files will be accepted, max file size: 100 MB)</em>
          </div>
          <Button type="button" onClick={open} className="mt-5">
            Select File
          </Button>
        </div>
      </div>
      {files.length > 0 && (
        <aside className="mt-4">
          <h4>Selected file:</h4>
          <ul>{files}</ul>
        </aside>
      )}
    </div>
  );
};

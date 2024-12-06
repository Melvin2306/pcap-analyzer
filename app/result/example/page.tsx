"use client";

import PieChartProtocol from "@/components/charts/PieChartProtocols";
import TimelineChart from "@/components/charts/TimelineChart";
import ResultsTable from "@/components/ResultsTable";
import { Packet } from "@/types/pcap";
import { useEffect, useState } from "react";

export default function ExampleResultsPage() {
  const [data, setData] = useState<Packet[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data: Packet[] = [
        {
          number: 1,
          timestamp: new Date("2024-12-01T10:00:00Z"),
          source_IPv4: "192.168.1.1",
          source_IPv6: "",
          source_port: 12345,
          destination_IPv4: "192.168.1.2",
          destination_IPv6: "",
          destination_port: 80,
          protocol: "TCP",
          length: 60,
          flags: "SYN",
          ttl: 64,
          info: "Example packet 1",
          data_Base64: "SGVsbG8gd29ybGQ=",
          data_Hex: "48656c6c6f20776f726c64",
        },
        {
          number: 2,
          timestamp: new Date("2024-12-01T10:01:00Z"),
          source_IPv4: "192.168.1.2",
          source_IPv6: "",
          source_port: 80,
          destination_IPv4: "192.168.1.1",
          destination_IPv6: "",
          destination_port: 12345,
          protocol: "TCP",
          length: 60,
          flags: "ACK",
          ttl: 64,
          info: "Example packet 2",
          data_Base64: "V2VsY29tZSB0byB0aGUgbmV0d29yaw==",
          data_Hex: "57656c636f6d6520746f20746865206e6574776f726b",
        },
        {
          number: 3,
          timestamp: new Date("2024-12-01T10:02:00Z"),
          source_IPv4: "192.168.1.3",
          source_IPv6: "",
          source_port: 54321,
          destination_IPv4: "192.168.1.4",
          destination_IPv6: "",
          destination_port: 443,
          protocol: "TCP",
          length: 70,
          flags: "SYN,ACK",
          ttl: 128,
          info: "Example packet 3",
          data_Base64: "SGVsbG8gZnJvbSB0aGUgb3RoZXIgc2lkZQ==",
          data_Hex: "48656c6c6f2066726f6d20746865206f746865722073696465",
        },
        {
          number: 4,
          timestamp: new Date("2024-12-01T10:03:00Z"),
          source_IPv4: "192.168.1.4",
          source_IPv6: "",
          source_port: 443,
          destination_IPv4: "192.168.1.3",
          destination_IPv6: "",
          destination_port: 54321,
          protocol: "TCP",
          length: 70,
          flags: "ACK",
          ttl: 128,
          info: "Example packet 4",
          data_Base64: "UmVwbHkgZnJvbSB0aGUgb3RoZXIgc2lkZQ==",
          data_Hex: "5265706c792066726f6d20746865206f746865722073696465",
        },
        {
          number: 5,
          timestamp: new Date("2024-12-01T10:04:00Z"),
          source_IPv4: "192.168.1.5",
          source_IPv6: "",
          source_port: 22222,
          destination_IPv4: "192.168.1.6",
          destination_IPv6: "",
          destination_port: 22,
          protocol: "TCP",
          length: 80,
          flags: "SYN",
          ttl: 64,
          info: "Example packet 5",
          data_Base64: "U29tZSBkYXRhIGZyb20gcGFja2V0IDU=",
          data_Hex: "536f6d6520646174612066726f6d207061636b65742035",
        },
        {
          number: 6,
          timestamp: new Date("2024-12-01T10:05:00Z"),
          source_IPv4: "192.168.1.6",
          source_IPv6: "",
          source_port: 22,
          destination_IPv4: "192.168.1.5",
          destination_IPv6: "",
          destination_port: 22222,
          protocol: "TCP",
          length: 80,
          flags: "SYN,ACK",
          ttl: 64,
          info: "Example packet 6",
          data_Base64: "UmVzcG9uc2UgZnJvbSBwYWNrZXQgNg==",
          data_Hex: "526573706f6e73652066726f6d207061636b65742036",
        },
        {
          number: 7,
          timestamp: new Date("2024-12-01T10:06:00Z"),
          source_IPv4: "192.168.1.7",
          source_IPv6: "",
          source_port: 33333,
          destination_IPv4: "192.168.1.8",
          destination_IPv6: "",
          destination_port: 8080,
          protocol: "HTTP",
          length: 100,
          flags: "",
          ttl: 64,
          info: "Example packet 7",
          data_Base64: "R0VUIC8gaHR0cCByZXF1ZXN0",
          data_Hex: "474554202f20687474702072657175657374",
        },
        {
          number: 8,
          timestamp: new Date("2024-12-01T10:07:00Z"),
          source_IPv4: "192.168.1.8",
          source_IPv6: "",
          source_port: 8080,
          destination_IPv4: "192.168.1.7",
          destination_IPv6: "",
          destination_port: 33333,
          protocol: "HTTP",
          length: 100,
          flags: "",
          ttl: 64,
          info: "Example packet 8",
          data_Base64: "SFRUUCByZXNwb25zZQ==",
          data_Hex: "4854545020726573706f6e7365",
        },
        {
          number: 9,
          timestamp: new Date("2024-12-01T10:07:01Z"),
          source_IPv4: "192.168.1.8",
          source_IPv6: "",
          source_port: 8080,
          destination_IPv4: "192.168.1.7",
          destination_IPv6: "",
          destination_port: 33333,
          protocol: "HTTP",
          length: 100,
          flags: "",
          ttl: 64,
          info: "Example packet 8",
          data_Base64: "SFRUUCByZXNwb25zZQ==",
          data_Hex: "4854545020726573706f6e7365",
        },
      ];

      setData(data);
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <TimelineChart data={data} />
      <PieChartProtocol data={data} />
      <ResultsTable data={data} />
    </div>
  );
}

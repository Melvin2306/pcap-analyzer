"use client";

import { Packet } from "@/types/pcap";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { getRandomColor } from "@/lib/utils";

export default function TimelineChart({ data }: { data: Packet[] }) {
  // Summarize the number of packets every 100ms
  const chartData = data.reduce((acc, packet) => {
    const timestamp = Math.floor(new Date(packet.timestamp).getTime() / 2000); // Adjusted to 100ms intervals for better granularity
    const existing = acc.find((item) => item.timestamp === timestamp);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ timestamp, count: 1 });
    }
    return acc;
  }, [] as { timestamp: number; count: number }[]);

  // Format the timestamp for display
  const formattedData = chartData.map((item) => ({
    // Convert the timestamp back to milliseconds and format it
    timestamp: new Date(item.timestamp * 100).toISOString().slice(11, 23),
    count: item.count,
  }));

  // Define your chart configuration
  const chartConfig = {
    count: {
      label: "Packet Count",
      color: getRandomColor(),
    },
  };

  return (
    <div>
      <h3>Packet Timeline</h3>
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart
          data={formattedData}
          width={600}
          height={300}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          accessibilityLayer
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // Format the timestamp label to show hours, minutes, and seconds
            tickFormatter={(value) => {
              const date = new Date(`1970-01-01T${value}Z`);
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              });
            }}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

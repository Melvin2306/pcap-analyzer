"use client";

import { Packet } from "@/types/pcap";
import { useMemo } from "react";
import { PieChart, Pie, Label, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getRandomColor } from "@/lib/utils";

interface PieChartProtocolProps {
  data: Packet[];
}

export default function PieChartProtocol({ data }: PieChartProtocolProps) {
  // Summarize the count of each protocol
  const protocolCounts = useMemo(() => {
    const counts: { [protocol: string]: number } = {};
    data.forEach((packet) => {
      const protocol = packet.protocol || "Unknown";
      counts[protocol] = (counts[protocol] || 0) + 1;
    });
    return counts;
  }, [data]);

  // Generate a consistent random color for each protocol
  const protocolColors = useMemo(() => {
    const colors: { [protocol: string]: string } = {};
    Object.keys(protocolCounts).forEach((protocol) => {
      colors[protocol] = getRandomColor();
    });
    return colors;
  }, [protocolCounts]);

  // Generate chart data with colors
  const chartData = useMemo(() => {
    return Object.entries(protocolCounts).map(([protocol, count]) => ({
      protocol,
      count,
      color: protocolColors[protocol],
    }));
  }, [protocolCounts, protocolColors]);

  // Define your chart configuration
  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    chartData.forEach((entry) => {
      config[entry.protocol] = {
        label: entry.protocol,
        color: entry.color, // Use the random color directly
      };
    });
    return config;
  }, [chartData]);

  const totalPackets = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <div>
      <h3>Protocol Distribution</h3>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="protocol"
            innerRadius={60}
            outerRadius={80}
            strokeWidth={5}
            label
            fill="#8884d8" // Default fill if needed
          >
            {/* Apply the color to each slice */}
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalPackets}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Packets
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Janeiro", Indicações: 186 },
  { month: "Fevereiro", Indicações: 305 },
  { month: "Março", Indicações: 237 },
  { month: "Abril", Indicações: 73 },
  { month: "Maio", Indicações: 120 },
  { month: "Junho", Indicações: 214 },
  { month: "Julho", Indicações: 150 },
  { month: "Agosto", Indicações: 97 },
  { month: "Setembro", Indicações: 88 },
  { month: "Outubro", Indicações: 200 },
  { month: "Novembro", Indicações: 270 },
  { month: "Dezembro", Indicações: 300 },
];

const chartConfig = {
  desktop: {
    label: "Indicações",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartAvtr() {
  return (
      <ResponsiveContainer>
        <Card>
          <CardHeader>
            <CardTitle>Indicações</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <defs>
                  <linearGradient id="gradDesktop" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5E00FF" />
                    <stop offset="100%" stopColor="#1E0051" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="Indicações" fill="url(#gradDesktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </ResponsiveContainer>
  );
}

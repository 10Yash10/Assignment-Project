"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

type ChartData = {
    month: string;
    Revenue: number;
    "Profit Trend": number;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: any[];
    label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="rounded-lg bg-white p-3 shadow"
                style={{
                    border: `2px solid #D3D3D3`, // border color of hovered line
                }}
            >
                <p className="font-semibold mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        {/* colored dot */}
                        <span
                            className="inline-block h-3 w-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        {/* label (line name) + month + value */}
                        <span className="text-sm">
                            {entry.name}  : {entry.value}M
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function LineChartComp({ data }: { data: ChartData[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                key={JSON.stringify(data)}
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 35,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis padding={{ left: 30, right: 30 }} dataKey="month" />
                <YAxis
                    tickFormatter={(value) => `${value}M`}
                    label={{
                        value: "(€)",
                        position: "insideTop",
                        offset: -30,
                        style: { textAnchor: "start", fontSize: 14 },
                    }}
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend iconType="circle" /> */}

                <Line
                    type="linear"
                    dataKey="Revenue"
                    stroke="oklch(62.3% 0.214 259.815)"
                    dot={{
                        fill: "oklch(62.3% 0.214 259.815)",
                        stroke: "oklch(62.3% 0.214 259.815)",
                        r: 5,
                    }}
                    activeDot={{ r: 7 }}
                />
                <Line
                    type="linear"
                    dataKey={"Profit Trend"}
                    stroke="oklch(64.6% 0.222 41.116)"
                    dot={{
                        fill: "oklch(64.6% 0.222 41.116)",
                        stroke: "oklch(64.6% 0.222 41.116)",
                        r: 5,
                    }}
                    activeDot={{ r: 7 }}
                />
                <Legend iconType="circle" />
            </LineChart>
        </ResponsiveContainer>
    );
}

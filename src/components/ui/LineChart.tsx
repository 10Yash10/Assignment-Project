'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ChartData = {
    month: string;
    revenue: number;
    "Profit Trend": number;
};

export default function LineChartComp({ data }: { data: ChartData[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                key={JSON.stringify(data)} // Add key to force re-render
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                    tickFormatter={(value) => `${value}M`}
                    label={{
                        value: "(€)",
                        position: "insideTop",
                        offset: 30,
                        style: { textAnchor: "start", fontSize: 14 }
                    }}
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Tooltip />
                <Legend iconType='rect' />
                <Line type="monotone" dataKey={"Profit Trend"} stroke="oklch(62.3% 0.214 259.815)" activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="revenue" stroke="oklch(64.6% 0.222 41.116)" activeDot={{ r: 4 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
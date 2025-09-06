"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jul 24',
        Revenue: 4000,
        "Profit Trend": 2400,
        amt: 2400,
    },
    {
        name: 'Aug 24',
        Revenue: 3000,
        "Profit Trend": 1398,
        amt: 2210,
    },
    {
        name: 'Sept 24',
        Revenue: 2000,
        "Profit Trend": 9800,
        amt: 2290,
    },
    {
        name: 'Oct 24',
        Revenue: 2780,
        "Profit Trend": 3908,
        amt: 2000,
    },
    {
        name: 'Nov 24',
        Revenue: 1890,
        "Profit Trend": 4800,
        amt: 2181,
    },
    {
        name: 'Dec 24',
        Revenue: 2390,
        "Profit Trend": 3800,
        amt: 2500,
    },
    {
        name: 'Jan 25',
        Revenue: 3490,
        "Profit Trend": 4300,
        amt: 2100,
    },
    {
        name: 'Mar 25',
        Revenue: 3490,
        "Profit Trend": 4300,
        amt: 2100,
    },
    {
        name: 'Apr 25',
        Revenue: 3490,
        "Profit Trend": 4300,
        amt: 2100,
    },
    {
        name: 'May 25',
        Revenue: 3490,
        "Profit Trend": 4300,
        amt: 2100,
    },
    {
        name: 'Jun 25',
        Revenue: 3490,
        "Profit Trend": 4300,
        amt: 2100,
    },
    {
        name: 'Jul 25',
        Revenue: 3490,
        "Profit Trend": 4300,
        amt: 2100,
    },
];

export default function LineChartComp() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                <XAxis dataKey="name" />
                <YAxis
                    tickFormatter={(value) => `${value}M`}
                    label={{
                        value: "(€)",
                        position: "insideTop",
                        offset: 30,
                        style: { textAnchor: "start", fontSize: 14 }
                    }}
                    domain={[0, (dataMax) => dataMax * 1.2]}
                />
                <Tooltip />
                <Legend iconType='rect' />
                <Line type="monotone" dataKey={"Profit Trend"} stroke="oklch(62.3% 0.214 259.815)" activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="Revenue" stroke="oklch(64.6% 0.222 41.116)" activeDot={{ r: 4 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

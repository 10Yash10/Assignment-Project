"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        "Operating Expense": 81,
        Revenue: 76,
        COGS: 86,
        amt: 66,
    },
    {
        name: 'Feb',
        "Operating Expense": 68,
        Revenue: 88,
        COGS: 78,
        amt: 78,
    },
    {
        name: 'Mar',
        "Operating Expense": 85,
        Revenue: 70,
        COGS: 90,
        amt: 59,
    },
    {
        name: 'Apr',
        "Operating Expense": 72,
        Revenue: 86,
        COGS: 69,
        amt: 67,
    },
    {
        name: 'May',
        "Operating Expense": 58,
        Revenue: 48,
        COGS: 87,
        amt: 75,
    },
    {
        name: 'Jun',
        "Operating Expense": 80,
        Revenue: 34,
        COGS: 75,
        amt: 74,
    },
];

type Payload = {
    name: string;
    value: number;
    color: string;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: Payload[];
    label?: string;
};

const BarGraphComp = () => {

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

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                    top: 35,
                    right: 5,
                    left: 0,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis
                    label={{
                        value: "(€)",
                        position: "insideTop",
                        offset: -30,
                        style: { textAnchor: "start", fontSize: 14 }
                    }}
                    domain={[20, 100]}
                    ticks={[20, 40, 60, 80, 100]}
                    tickFormatter={(val) => `${val}M`}
                />
                {/* <Tooltip wrapperStyle={{ border: "2px solid #D3D3D3", borderRadius: 10, overflow: "hidden" }} labelFormatter={(val) => `(${val}'25)`} formatter={(val) => `${val}M`} /> */}
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType='circle' />
                <Bar barSize={8} dataKey="Revenue" fill="oklch(62.3% 0.214 259.815)" radius={[9999, 9999, 0, 0]} />
                <Bar barSize={8} dataKey={"Operating Expense"} fill="oklch(62.7% 0.265 303.9)" radius={[9999, 9999, 0, 0]} />
                <Bar barSize={8} dataKey="COGS" fill="oklch(85.2% 0.199 91.936)" radius={[9999, 9999, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarGraphComp;

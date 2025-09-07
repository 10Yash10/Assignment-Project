"use client";
import BarGraphComp from "@/components/ui/BarGraphComp";
import Header from "@/components/ui/Header";
import InfoCard from "@/components/ui/InfoCard";
import LineChartComp from "@/components/ui/LineChart";
import { ChartColumn, ChartSpline, Maximize2, TableProperties, TrendingDown, TrendingUp } from "lucide-react";
import { companyData } from "@/data/companies";
import { lineChartData } from "@/data/linechart";
import Image from "next/image";
import { useState } from "react";

import withAuth from "@/components/withAuth";

const DashboardPage = () => {
    const [year, setYear] = useState("2024-2025");
    const wcCycleDays = [52, 76, 45, 88, 25, 36, 55, 65, 70, 40, 80, 30, 60, 50, 75, 48, 58, 68, 78, 88, 98, 28, 38, 48];
    const cashFlowData = ['150M', '100M', '200M', '50M', '300M', '80M', '140M', '40M', '250M', '90M', '180M', '60M', '220M', '70M', '280M', '85M', '150M', '45M', '240M', '100M', '190M', '55M', '230M', '65M'];
    const highlightCompanyName = (desc: string, companyName: string) => {
        if (!companyName) return desc;
        const regex = new RegExp(`(${companyName})`, 'gi');
        return desc.replace(regex, `<span class="text-yellow-600">$1</span>`);
    };
    const boxInformation = [
        {
            id: 1,
            title: "Consolidated Revenue",
            price: "24.5B",
            gain: "+12.5%",
        },
        {
            id: 2,
            title: "Net Profit",
            price: "40.5M",
            gain: "+8.3% YoY",
        },
        {
            id: 3,
            title: "EBITDA Margin",
            price: "14.6%",
            gain: "-3.6% YoY",
        },
        {
            id: 4,
            title: "Working Capital",
            price: "25.7M",
            gain: "-3.3% YoY",
        },
    ]

    const handleYearChange = (newYear: string) => {
        setYear(newYear);
    };

    const chartData = lineChartData[year as keyof typeof lineChartData] || [];
    console.log("chartData", chartData);

    return (
        <div>
            <Header title="Dashboard" selectedYear={year} onYearChange={handleYearChange} />
            {/* information in box */}
            <div className="mt-4 flex flex-wrap flex-row gap-4">
                {boxInformation.map((item) => (
                    <div key={item.id} className="flex flex-1">
                        <InfoCard ukey={item.id} title={item.title} price={item.price} gain={item.gain} />
                    </div>
                ))
                }
            </div>

            {/* main body grid */}
            <div className="grid grid-cols-3 grid-rows-2 grid-flow-row gap-4 p-4">
                {/* Revenue and Profit trend */}
                <div className="col-span-2 auto-cols-max h-[25rem] border space-y-4 border-neutral-300 p-4 rounded-lg">
                    <div className="w-full h-[10%] flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <ChartSpline size={18} />
                            <h1 className="font-medium">Revenue and Profit Trend</h1>
                        </div>
                        <Maximize2 className="text-blue-400" size={14} />
                    </div>
                    <div className="h-[90%]">
                        <LineChartComp data={chartData} />
                    </div>
                </div>

                {/* Margin Trend */}
                <div className="col-span-1 auto-cols-max h-[25rem] border space-y-4 border-neutral-300 p-4 rounded-lg">
                    <div className="w-full h-[10%] flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <ChartColumn size={18} />
                            <h1 className="font-medium">Margin Trend <span className="text-neutral-400 font-regular">{"("}Last 6 monts{")"}</span></h1>
                        </div>
                        <Maximize2 className="text-blue-400" size={14} />
                    </div>
                    <div className="h-[90%]">
                        <BarGraphComp />
                    </div>
                </div>

                {/* Entity wise performance */}
                <div className="col-span-2 auto-cols-max h-[25rem] border space-y-4 border-neutral-300 p-4 rounded-lg">
                    <div className="w-full h-[10%] flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <TableProperties size={18} />
                            <h1 className="font-medium">Entity wise performance</h1>
                        </div>
                        <Maximize2 className="text-blue-400" size={14} />
                    </div>
                    <div className="h-[90%] overflow-y-auto">
                        <table className="w-full ">
                            <thead className="sticky top-0">
                                <tr className="border-b bg-white border-gray-300 text-neutral-600">
                                    <th className="text-left p-4">Company Name</th>
                                    <th className="text-left p-4">Revenue</th>
                                    <th className="text-left p-4">Net Profit</th>
                                    <th className="text-left p-4">EBITDA</th>
                                    <th className="text-left p-4">Cash Flow(€M)</th>
                                    <th className="text-left p-4">WC Cycle (Days)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyData.map((company, index) => (
                                    <tr key={company.companyName} className="border-b border-gray-300 font-medium">
                                        <td className="p-4 flex items-center">
                                            <Image src="/logo.svg" alt="logo" width={24} height={24} className="inline-block mr-2" />
                                            {company.companyName}
                                        </td>
                                        <td className="p-4">€{company.revenue}</td>
                                        <td className="p-4">€{company.profit}M</td>
                                        <td className={`p-4 flex items-center gap-1 ${company.profit > 0 ? "text-green-500" : "text-red-500"}`}>
                                            {company.profit > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                            <span>{Math.abs(company.grossMargin)}%</span>
                                        </td>
                                        <td className="p-4">€{cashFlowData[index]}</td>
                                        <td className="p-4">{wcCycleDays[index]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Insights */}
                <div className="col-span-1 auto-cols-max h-[25rem] border space-y-4 bg-radial from-yellow-100 to-white border-neutral-300 p-4 rounded-lg overflow-hidden">
                    <div className="w-full h-[10%] flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <h1 className="font-medium">✨Insights</h1>
                        </div>
                        <Maximize2 className="text-blue-400" size={14} />
                    </div>
                    <div className="h-[90%] px-6 overflow-y-auto">
                        {/* <BarGraphComp /> */}
                        {/* <div>
                            <Image src="/star.png" alt="start icon" width="20" height="5" />
                            
                        </div> */}
                        <ul className="list-image-[url('/star.png')] ml-4 ">
                            {[{
                                id: 1,
                                heading: "Monthly Variance Summaries",
                                desc: "Elevate Co. reported an 8% decline in profit this month, primarily driven by increased logistics expenses.",
                                company: "Elevate Co."
                            }, {
                                id: 2,
                                heading: "Recommended Actions",
                                desc: "Reduce payroll costs in Crestview Technologies by 12% to improve efficiency.",
                                company: "Crestview Technologies"
                            },
                            {
                                id: 3,
                                heading: "Market Trends",
                                desc: "NextGen Inc. has seen a 15% increase in customer demand attributed to the launch of their new product line.",
                                company: "NextGen Inc."
                            },
                            {
                                id: 4,
                                heading: "Future Projects",
                                desc: "Analysts predict a 10% growth in revenue for Elevate Co. next quarter, as new partnerships are expected to enhance market reach.",
                                company: "Elevate Co."
                            }].map((item) => (
                                <li key={item.id} className="mb-4">
                                    <h1 className="text-md text-neutral-700 font-regular">{item.heading}</h1>
                                    <p className="text-sm text-neutral-700 font-regular" dangerouslySetInnerHTML={{ __html: highlightCompanyName(item.desc, item.company) }}></p>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(DashboardPage);

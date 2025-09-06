import BarGraphComp from "@/components/ui/BarGraphComp";
import Header from "@/components/ui/Header";
import InfoCard from "@/components/ui/InfoCard";
import LineChartComp from "@/components/ui/LineChart";
import { ChartColumn, ChartSpline, Maximize, Maximize2 } from "lucide-react";

const page = () => {
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
    return (
        <div>
            <Header title="Dashboard" />
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
                            <h1>Revenue and Profit Trend</h1>
                        </div>
                        <Maximize2 className="text-blue-400" size={14} />
                    </div>
                    <div className="h-[90%]">
                        <LineChartComp />
                    </div>
                </div>

                {/* Margin Trend */}
                <div className="col-span-1 auto-cols-max h-[25rem] border space-y-4 border-neutral-300 p-4 rounded-lg">
                    <div className="w-full h-[10%] flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <ChartColumn size={18} />
                            <h1>Margin Trend <span className="text-neutral-400">{"("}Last 6 monts{")"}</span></h1>
                        </div>
                        <Maximize2 className="text-blue-400" size={14} />
                    </div>
                    <div className="h-[90%]">
                        <BarGraphComp />
                    </div>
                </div>

                {/* Entry wise performance */}
                <div className="col-span-2 bg-red-500 auto-cols-max">3</div>

                {/* Insights */}
                <div className="col-span-1 bg-red-500 auto-cols-max">4</div>
            </div>
        </div>
    )
}

export default page;
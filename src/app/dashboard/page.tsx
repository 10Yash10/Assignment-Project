import Header from "@/components/ui/Header";
import InfoCard from "@/components/ui/InfoCard";

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
        </div>
    )
}

export default page;
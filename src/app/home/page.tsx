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
            id: 1,
            title: "Net Profit",
            price: "40.5M",
            gain: "+8.3% YoY",
        },
        {
            id: 1,
            title: "EBITDA Margin",
            price: "14.6%",
            gain: "-3.6% YoY",
        },
        {
            id: 1,
            title: "Working Capital",
            price: "25.7M",
            gain: "-3.3% YoY",
        },
    ]
    return (
        <div>
            {/* information in box */}
            <div className="flex flex-wrap flex-row gap-4">
                {boxInformation.map((item) => (
                    <InfoCard ukey={item.id} title={item.title} price={item.price} gain={item.gain} />
                ))
                }
            </div>
        </div>
    )
}

export default page;
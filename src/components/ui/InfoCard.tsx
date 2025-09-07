import { TrendingDown, TrendingUp } from "lucide-react";

const InfoCard = ({ ukey, title, price, gain }: { ukey: number, title: string, price: string, gain: string }) => {
    const color = gain.startsWith("+") ? "text-green-500" : "text-red-500";
    const sign = gain.startsWith("+") ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
    return (
        <div key={ukey} className="p-4 flex flex-1 flex-col gap-2 border border-neutral-300 rounded-lg">
            <span className="text-sm font-regular text-neutral-500">{title}</span>
            <span className="text-2xl font-medium ">{price.endsWith("%") ? price : "€" + price}</span>
            <span className={`text-sm font-medium ${color} flex items-center gap-1`}>{sign}{gain}</span>
        </div>
    )
}

export default InfoCard;
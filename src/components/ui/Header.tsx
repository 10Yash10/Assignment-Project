import { Bell, PanelRight } from "lucide-react";
import YearSelector from "./YearSelector";

const Header = ({ title, showYearSelector = true }: { title: string, showYearSelector?: boolean }) => {
    return (
        <nav className="w-full h-20 border-b bg-white border-b-neutral-300 flex justify-between">
            {/* main logo and year selector */}
            <div className="h-full flex items-center gap-6 ml-4">
                <PanelRight className="rotate-180" strokeWidth={2} />
                <h1 className="text-3xl font-medium">{title}</h1>
                {showYearSelector && <YearSelector />}
            </div>

            {/* company name, notification and ai feature */}
            <div className="h-full flex items-center mr-4 gap-6">
                <div className="flex items-center justify-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-neutral-300"></div>
                    <h1>Quben Infra</h1>
                </div>
                <div className="p-2 bg-neutral-300 rounded-full">
                    <Bell fill="black" size={16} />
                </div>
                <button className="h-1/2 border-2 border-yellow-500 px-4 rounded-lg bg-gradient-to-r from-white via-yellow-200 to-white font-medium cursor-pointer hover:from-yellow-300 hover:via-white hover:to-yellow-300 duration-300">✨ Ask AI</button>
            </div>
        </nav>
    )
}

export default Header;
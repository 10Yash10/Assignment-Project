"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const YearSelector = () => {
    const [year, setYear] = useState("2024-2025");
    const [dropdown, setDropdown] = useState<boolean>(false);
    const years = ["2023-2024", "2022-2023", "2021-2022", "2020-2021"];
    return (
        <div>
            <button onClick={() => setDropdown(!dropdown)} className="h-[50%] w-36 border-2 border-neutral-600 rounded-lg cursor-pointer flex items-center justify-center text-md">
                FY {"(" + year + ")"} {dropdown ? <ChevronUp /> : <ChevronDown />}</button>
            {dropdown && <div className="w-36 absolute mt-2 h-auto rounded-lg border-2 border-neutral-600 bg-white overflow-hidden">
                {years.map((item) => (<button className="w-full px-4 py-2 hover:bg-neutral-300 cursor-pointer" onClick={() => { setYear(item); setDropdown(false) }}>{item}</button>))}
            </div>}
        </div>
    )
}

export default YearSelector;
"use client"
import Header from "@/components/ui/Header";
import { companyData } from "@/data/companies";
import { ChevronLeft, ChevronRight, Filter, Plus, Search, TableProperties, TrendingDown, TrendingUp, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
    const [companies, setCompanies] = useState(companyData);
    const [filteredCompanies, setFilteredCompanies] = useState(companies);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCompany, setNewCompany] = useState({ companyName: "", ceo: "", revenue: "", profit: 0, ebitda: "", grossMargin: 0, keyInsights: "" });

    useEffect(() => {
        const storedCompanies = JSON.parse(localStorage.getItem("companies") || "[]");
        if (storedCompanies.length > 0) {
            setCompanies([...companyData, ...storedCompanies]);
        }
    }, []);

    useEffect(() => {
        const filtered = companies.filter(company =>
            company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCompanies(filtered);
        setCurrentPage(1); // Reset to first page on search
    }, [searchQuery, companies]);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddCompany = () => {
        const updatedCompanies = [...companies, newCompany];
        setCompanies(updatedCompanies);
        localStorage.setItem("companies", JSON.stringify([...JSON.parse(localStorage.getItem("companies") || "[]"), newCompany]));
        setIsModalOpen(false);
        setNewCompany({ companyName: "", ceo: "", revenue: "", profit: 0, ebitda: "", grossMargin: 0, keyInsights: "" });
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredCompanies.slice(startIndex, endIndex);

    return (
        <div className="text-black">
            <Header title="List your company" showYearSelector={false} />
            <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search Companies" className="pl-10 pr-4 py-2 border border-gray-300 rounded-md" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="p-2 bg-white border border-gray-300 rounded-md">
                            <Filter size={20} className="text-blue-500" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-md cursor-pointer">
                            <Upload size={20} />
                            <span>Export</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-md cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <Plus size={20} />
                            <span>Add Company</span>
                        </button>
                    </div>
                </div>
                <div className="flex justify-end items-center mb-4">
                    <div className="flex items-center gap-2">
                        <span>{`${startIndex + 1}-${Math.min(endIndex, filteredCompanies.length)} of ${filteredCompanies.length}`}
                        </span>
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 flex items-center disabled:opacity-50 cursor-pointer text-neutral-600">
                            <ChevronLeft size={14} className="mt-1" /> Back
                        </button>
                        {currentPage > 1 && <span className="text-sm">{currentPage - 1}</span>}
                        <span className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm">{currentPage}</span>
                        {currentPage < totalPages && <span className="text-sm">{currentPage + 1}</span>}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 text-neutral-600 flex items-center disabled:opacity-50 cursor-pointer">
                            Next <ChevronRight size={14} className="mt-1" />
                        </button>
                    </div>
                </div>
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="border-b border-gray-300 ">
                            <th className="text-left p-2 border border-gray-300">Company Name</th>
                            <th className="text-left p-2 border border-gray-300">CEO/Key Person</th>
                            <th className="text-left p-2 border border-gray-300">Revenue</th>
                            <th className="text-left p-2 border border-gray-300">Profit</th>
                            <th className="text-left p-2 border border-gray-300">EBITDA</th>
                            <th className="text-left p-2 border border-gray-300">Gross Margin</th>
                            <th className="text-left p-2 border border-gray-300">Key Insights</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((company, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2 border border-gray-300"><TableProperties size={20} className="inline-block mr-2" />{company.companyName}</td>
                                <td className="p-2 border border-gray-300"><Image src="/profile.svg" alt="profile" width={24} height={24} className="rounded-full inline-block mr-2" />{company.ceo}</td>
                                <td className="p-2 border border-gray-300">€{company.revenue}</td>
                                <td className={`p-2 border border-gray-300 ${company.profit > 0 ? "text-green-500" : "text-red-500"}`}>{company.profit > 0 ? `+${company.profit}` : company.profit}%</td>
                                <td className="p-2 border border-gray-300">{company.ebitda}</td>
                                <td className={`p-2 flex items-center gap-1 border border-gray-300 ${company.grossMargin > 0 ? "text-green-500" : "text-red-500"}`}>
                                    {company.grossMargin > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                    <span className="text-black">{Math.abs(company.grossMargin)}%</span>
                                </td>
                                <td className="p-2 border border-gray-300">
                                    <span className="border border-gray-400 rounded-md px-2 py-1 text-sm">{company.keyInsights}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl mb-4">Add New Company</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Company Name" value={newCompany.companyName} onChange={(e) => setNewCompany({ ...newCompany, companyName: e.target.value })} className="p-2 border border-gray-300 rounded-md" />
                            <input type="text" placeholder="CEO/Key Person" value={newCompany.ceo} onChange={(e) => setNewCompany({ ...newCompany, ceo: e.target.value })} className="p-2 border border-gray-300 rounded-md" />
                            <input type="text" placeholder="Revenue" value={newCompany.revenue} onChange={(e) => setNewCompany({ ...newCompany, revenue: e.target.value })} className="p-2 border border-gray-300 rounded-md" />
                            <input type="number" placeholder="Profit" value={newCompany.profit} onChange={(e) => setNewCompany({ ...newCompany, profit: parseInt(e.target.value) })} className="p-2 border border-gray-300 rounded-md" />
                            <input type="text" placeholder="EBITDA" value={newCompany.ebitda} onChange={(e) => setNewCompany({ ...newCompany, ebitda: e.target.value })} className="p-2 border border-gray-300 rounded-md" />
                            <input type="number" placeholder="Gross Margin" value={newCompany.grossMargin} onChange={(e) => setNewCompany({ ...newCompany, grossMargin: parseInt(e.target.value) })} className="p-2 border border-gray-300 rounded-md" />
                            <input type="text" placeholder="Key Insights" value={newCompany.keyInsights} onChange={(e) => setNewCompany({ ...newCompany, keyInsights: e.target.value })} className="p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-200">Cancel</button>
                            <button onClick={handleAddCompany} className="px-4 py-2 rounded-md bg-blue-500 text-white">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page;
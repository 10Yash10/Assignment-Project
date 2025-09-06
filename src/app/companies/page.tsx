"use client"
import Header from "@/components/ui/Header";
import { companyData } from "@/data/companies";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Filter, Plus, Search, TableProperties, TrendingDown, TrendingUp, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import withAuth from "@/components/withAuth";

type Company = {
    companyName: string;
    ceo: string;
    revenue: string;
    profit: number;
    ebitda: string;
    grossMargin: number;
    keyInsights: string;
};

const Page = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [newCompany, setNewCompany] = useState<Company>({ companyName: "", ceo: "", revenue: "", profit: 0, ebitda: "", grossMargin: 0, keyInsights: "" });
    const [sortConfig, setSortConfig] = useState<{ key: keyof Company; direction: string }>({ key: "companyName", direction: "asc" });

    useEffect(() => {
        const storedCompanies = JSON.parse(localStorage.getItem("companies") || "[]");
        setCompanies([...companyData, ...storedCompanies]);
    }, []);

    useEffect(() => {
        const filtered = companies.filter(company =>
            company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                // Helper function to parse revenue string like "256M"
                const parseRevenue = (revenue: string) => {
                    if (typeof revenue === 'string') {
                        return parseFloat(revenue.replace('M', '')) * 1000000;
                    }
                    return revenue;
                };

                const aParsed = sortConfig.key === 'revenue' ? parseRevenue(aValue as string) : aValue;
                const bParsed = sortConfig.key === 'revenue' ? parseRevenue(bValue as string) : bValue;

                if (aParsed < bParsed) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (aParsed > bParsed) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredCompanies(filtered);
        setCurrentPage(1); // Reset to first page on search or sort
    }, [searchQuery, companies, sortConfig]);

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

    const requestSort = (key: keyof Company) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        setIsFilterOpen(false);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredCompanies.slice(startIndex, endIndex);

    const getSortIcon = (key: keyof Company) => {
        if (sortConfig.key !== key) {
            return null;
        }
        if (sortConfig.direction === "asc") {
            return <ArrowUp size={16} className="ml-1" />;
        }
        return <ArrowDown size={16} className="ml-1" />;
    };

    const filterOptions: { key: keyof Company; label: string }[] = [
        { key: "companyName", label: "Company Name" },
        { key: "ceo", label: "CEO/Key Person" },
        { key: "revenue", label: "Revenue" },
        { key: "profit", label: "Profit" },
        { key: "ebitda", label: "EBITDA" },
        { key: "grossMargin", label: "Gross Margin" },
        { key: "keyInsights", label: "Key Insights" },
    ];

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
                        <div className="relative">
                            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="p-2 bg-white border border-blue-500 hover:bg-blue-50 rounded-md cursor-pointer">
                                <Filter size={20} className="text-blue-500" />
                            </button>
                            {isFilterOpen && (
                                <div className="absolute top-full mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                    {filterOptions.map(option => (
                                        <div key={option.key} className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => requestSort(option.key)}>
                                            <span>{option.label}</span>
                                            {getSortIcon(option.key)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border hover:bg-blue-50 border-blue-500 text-blue-500 rounded-md cursor-pointer">
                            <Upload size={20} />
                            <span>Export</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border hover:bg-blue-50 border-blue-500 text-blue-500 rounded-md cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <Plus size={20} />
                            <span>Add Company</span>
                        </button>
                    </div>
                </div>
                <div className="flex justify-end items-center my-8 ">
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
                <div className="rounded-lg border border-gray-300 overflow-hidden">
                    <table className="w-full ">
                        <thead>
                            <tr className="border-b border-gray-300 text-neutral-600">
                                <th className="text-left p-4">Company Name</th>
                                <th className="text-left p-4">CEO/Key Person</th>
                                <th className="text-left p-4">Revenue</th>
                                <th className="text-left p-4">Profit</th>
                                <th className="text-left p-4">EBITDA</th>
                                <th className="text-left p-4">Gross Margin</th>
                                <th className="text-left p-4">Key Insights</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((company) => (
                                <tr key={company.companyName} className="border-b border-gray-300 font-medium">
                                    <td className="p-4"><TableProperties size={20} className="inline-block mr-2" />{company.companyName}</td>
                                    <td className="p-4"><Image src="/profile.svg" alt="profile" width={24} height={24} className="rounded-full inline-block mr-2" />{company.ceo}</td>
                                    <td className="p-4">€{company.revenue}</td>
                                    <td className={`p-4 ${company.profit > 0 ? "text-green-500" : "text-red-500"}`}>{company.profit > 0 ? `+${company.profit}` : company.profit}%</td>
                                    <td className="p-4">{company.ebitda}</td>
                                    <td className={`p-4 flex items-center gap-1 ${company.grossMargin > 0 ? "text-green-500" : "text-red-500"}`}>
                                        {company.grossMargin > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                        <span className="text-black">{Math.abs(company.grossMargin)}%</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="border border-gray-300 rounded-full px-2 py-1 text-sm text-gray-800">{company.keyInsights}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

export default withAuth(Page);

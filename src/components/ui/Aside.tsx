"use client"
import { Database, ListTree, Settings } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Aside = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.length > 0) {
            setUserName(users[0].name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authenticated");
        router.push("/login");
    };

    const links = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard color="white" />
        },
        {
            name: "Companies",
            href: "/companies",
            icon: <ListTree color="white" />
        },
        {
            name: "User Database",
            href: "/users",
            icon: <Database color="white" />
        },
        {
            name: "Settings",
            href: "/settings",
            icon: <Settings color="white" />
        }
    ]
    return (
        <aside className="w-16 h-screen fixed top-0 bg-neutral-900 flex flex-col items-center py-4">
            <div className="h-20">
                <Image src="/logo.svg" className="p-2 rounded-full bg-white" alt="logo" width={40} height={40} />
            </div>
            <div className="flex flex-col gap-4">
                {links.map((link) => (
                    <Link href={link.href} key={link.name}>
                        <div className={`p-2 rounded-lg ${pathname === link.href ? "bg-blue-600" : ""}`}>
                            {link.icon}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-auto relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-2 rounded-full bg-neutral-200 cursor-pointer">
                    <Image src="/profile.svg" alt="profile" width={20} height={20} />
                </button>
                {dropdownOpen && (
                    <div className="absolute bottom-12 left-0 w-48 bg-white border border-neutral-500 z-40 rounded-md shadow-lg overflow-hidden">
                        <div className="p-2 text-left border-b">{userName}</div>
                        <button onClick={handleLogout} className="w-full p-2 text-center hover:bg-red-600 cursor-pointer bg-red-500 text-white">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Aside;

"use client"
import { Database, ListTree, Settings, User } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Aside = () => {
    const pathname = usePathname();

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
        <aside className="w-16 h-screen absolute top-0 bg-neutral-900 flex flex-col items-center py-4">
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
            <div className="mt-auto">
                <Image src="/profile.svg" alt="profile" width={40} height={40} />
            </div>
        </aside>
    )
}

export default Aside;
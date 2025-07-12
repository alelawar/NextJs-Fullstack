"use client"
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AsideDashboard() {
    const pathname = usePathname();
    const [navbar, setNavbar] = useState(false);
    const { user } = useUser();
    const role = user?.publicMetadata?.role;

    const isActive = (href: string) => pathname === href;

    const navItems = [
        {
            href: "/dashboard",
            label: "Dashboard",
            show: true,
        },
        {
            href: "/dashboard/article",
            label: "Articles",
            show: true,
        },
        {
            href: "/dashboard/user",
            label: "Users",
            show: true,
        },
        {
            href: "/dashboard/category",
            label: "Categories",
            show: true,
        },
        {
            href: "/dashboard/admin",
            label: "Admin Page",
            show: role === "admin",
        },
    ];

    return (
        <nav>
            {/* Mobile button */}
            <div className="md:hidden">
                <button
                    onClick={() => setNavbar((prev) => !prev)}
                    className="text-white  px-2 py-1 rounded"
                >
                    {navbar ? (
                        <i className="bi bi-x-lg"></i>
                    ) : (
                        <i className="bi bi-list"></i>
                    )}
                </button>
            </div>

            {/* Mobile nav */}
            {navbar && (
                <ul className="flex flex-col gap-2 p-4 md:hidden">
                    {navItems
                        .filter((item) => item.show)
                        .map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${isActive(item.href)
                                        ? "font-bold text-white bg-slate-400/20 rounded-md"
                                        : "text-slate-300"
                                        } hover:underline transition-all block px-2 py-1`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                </ul>
            )}

            {/* Desktop nav */}
            <ul className="hidden md:flex flex-col gap-2">
                {navItems
                    .filter((item) => item.show)
                    .map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`${isActive(item.href)
                                    ? "font-bold text-white bg-slate-400/20 rounded-md"
                                    : "text-slate-300"
                                    } hover:underline transition-all block px-2 py-1`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}

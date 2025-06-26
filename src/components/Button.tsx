import Link from "next/link"
import React from "react";
import { ButtonProps } from "@/types/types";

export const Button: React.FC<ButtonProps> = ({ href, label, icon }) => {
    return (
        <>
            <Link href={href}>
                <i 
                className={`${icon} px-3 py-1.5 border border-slate-300 hover:rounded-md transition duration-700 ease-in-out text-xs md:text-lg hover:text-blue-600 mx-5`}>
                    <span className="ml-3">{label}</span>
                </i>
            </Link>
        </>
    )
}
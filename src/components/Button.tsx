"use client"
import Link from "next/link"
import React from "react";
import { ButtonAdminProps, ButtonProps } from "@/types/types";
import { useFormStatus } from "react-dom";

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

export const ButtonCreate = () => {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className={pending ? `px-4 py-2  text-white rounded bg-slate-800` : `px-4 py-2  text-white rounded bg-blue-500 hover:bg-blue-600`}
            disabled={pending}
        >
            {pending ? "Mengirim" : "Buat"}
        </button>
    )
}


export const ButtonAdmin = ({ label, sending = "Loading..." }: ButtonAdminProps) => {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? sending : label}
    </button>
  )
}
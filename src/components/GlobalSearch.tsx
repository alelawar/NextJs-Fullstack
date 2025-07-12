// components/GlobalSearch.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface GlobalSearchProps {
    searchAction?: string; // URL tujuan search (default: current page)
    placeholder?: string;
    className?: string;
    preserveParams?: boolean; // Apakah mau preserve params lain selain search
}

export default function GlobalSearch({ 
    searchAction,
    placeholder = "Cari artikel...", 
    className = "",
    preserveParams = true
}: GlobalSearchProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState(searchParams.get('search') || '')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        const params = new URLSearchParams()
        
        // Kalau mau preserve params lain (seperti page, filter, dll)
        if (preserveParams) {
            searchParams.forEach((value, key) => {
                if (key !== 'search' && key !== 'page') { // Reset page saat search baru
                    params.set(key, value)
                }
            })
        }
        
        // Set search param
        if (searchValue.trim()) {
            params.set('search', searchValue.trim())
        }
        
        // Reset ke page 1 saat search
        params.set('page', '1')
        
        const targetUrl = searchAction || window.location.pathname
        const queryString = params.toString()
        
        router.push(`${targetUrl}${queryString ? `?${queryString}` : ''}`)
    }

    const handleClear = () => {
        setSearchValue('')
        
        const params = new URLSearchParams()
        if (preserveParams) {
            searchParams.forEach((value, key) => {
                if (key !== 'search' && key !== 'page') {
                    params.set(key, value)
                }
            })
        }
        
        const targetUrl = searchAction || window.location.pathname
        const queryString = params.toString()
        
        router.push(`${targetUrl}${queryString ? `?${queryString}` : ''}`)
    }

    return (
        <div className={`px-3 md:mx-8 mb-6 mt-10 ${className}`}>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        name="search"
                        placeholder={placeholder}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full px-3 py-2 border rounded pr-8"
                    />
                    {searchValue && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Cari
                </button>
            </form>
        </div>
    )
}
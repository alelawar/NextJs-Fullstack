"use client";
import {  ReusableChartProps } from "@/types/types";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Tambahan interface buat props yang lebih lengkap


export default function ReusableChart({ 
    data, 
    title = "Chart Data",
    linkText = "Lihat Selengkapnya",
    linkHref = "#",
    barColor = "#3b82f6",
    height = 300,
    dateFormat = true,
    dataKeyX = "name",
    dataKeyY = "articles",
    tooltipLabel = "Jumlah"
}: ReusableChartProps) {
    
    // Transform data - lebih fleksibel
    const transformedData = data?.map(item => {
        if (dateFormat) {
            // Kalau butuh format tanggal (seperti daily stats)
            return {
                date: item._id,
                articles: item.count,
                name: new Date(item._id).toLocaleDateString('id-ID', {
                    month: 'short',
                    day: 'numeric'
                })
            };
        } else {
            // Kalau ga butuh format tanggal (seperti category stats)
            return {
                name: Array.isArray(item._id) ? item._id[0] : item._id,
                articles: item.count,
                count: item.count
            };
        }
    }) || [];

    return (
        <div className="w-full flex justify-between flex-col">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {linkHref !== "#" && (
                <Link href={linkHref} className="text-sm hover:underline mb-4">
                    {linkText}
                </Link>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={transformedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey={dataKeyX}
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => [`${value} artikel`, tooltipLabel]}
                        labelFormatter={(label) => dateFormat ? `Tanggal: ${label}` : `Kategori: ${label}`}
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#f9fafb'
                        }}
                        labelStyle={{
                            color: '#60a5fa',
                        }}
                    />
                    <Bar
                        dataKey={dataKeyY}
                        fill={barColor}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

// Contoh penggunaan:

// 1. Buat Daily Stats (sama seperti sebelumnya)
/*
<ReusableChart 
    data={dailyStats}
    title="Artikel Per Hari (7 Hari Terakhir)"
    linkText="Lihat Selengkapnya"
    linkHref="/dashboard/daily-stats"
    barColor="#3b82f6"
    dateFormat={true}
/>
*/

// 2. Buat Category Stats (baru)
/*
<ReusableChart 
    data={categoryStats}
    title="Artikel Per Kategori"
    linkText="Lihat Semua Kategori"
    linkHref="/dashboard/categories"
    barColor="#10b981"
    dateFormat={false}
    tooltipLabel="Total Artikel"
/>
*/

// 3. Buat chart lain dengan custom props
/*
<ReusableChart 
    data={customData}
    title="Data Custom"
    linkText="Detail"
    linkHref="/custom-page"
    barColor="#ef4444"
    height={400}
    dateFormat={false}
/>
*/
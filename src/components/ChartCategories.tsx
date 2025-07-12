"use client";
import { CategoryChartProps } from "@/types/types";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

export default function CategoryChart({ data }: CategoryChartProps) {
    // Transform data untuk pie chart
    const transformedData = data?.map(item => ({
        name: item._id || 'Unknown',
        value: item.count,
        articles: item.count
    })) || [];

    return (
        <div className="w-full ">
            <h3 className="text-lg font-semibold mb-2">Distribusi Artikel Per Kategori</h3>
            <Link href="/dashboard/category" className="text-sm hover:underline  mb-4" >Lihat Selengkapnya</Link>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={transformedData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {transformedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} artikel`, 'Jumlah']} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
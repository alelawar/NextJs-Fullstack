"use client"
import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex flex-col gap-6">
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart Skeleton */}
          <div className="bg-black p-4 rounded-lg">
            <div className="h-5 w-40 bg-white rounded animate-pulse mb-4"></div>
            <div className="h-4 w-28 bg-white rounded animate-pulse mb-6"></div>
            <div className="flex items-end justify-around h-48">
              {[40, 60, 80].map((h, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-10`} style={{ height: `${h}px`, backgroundColor: "#4b5563" }}></div>
                  <div className="h-3 w-6 bg-white rounded animate-pulse mt-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart Skeleton */}
          <div className="bg-black p-4 rounded-lg">
            <div className="h-5 w-48 bg-white rounded animate-pulse mb-4"></div>
            <div className="h-4 w-28 bg-white rounded animate-pulse mb-6"></div>
            <div className="flex items-center justify-center">
              <div className="w-40 h-40 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse mr-2"></div>
                  <div className="h-3 w-16 bg-white rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Another Bar Chart */}
        <div className="bg-black p-4 rounded-lg">
          <div className="h-5 w-40 bg-white rounded animate-pulse mb-4"></div>
          <div className="h-4 w-28 bg-white rounded animate-pulse mb-6"></div>
          <div className="flex items-end justify-around h-48">
            {[60, 60].map((h, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12" style={{ height: `${h}px`, backgroundColor: "#4b5563" }}></div>
                <div className="h-3 w-6 bg-white rounded animate-pulse mt-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributors Table */}
        <div>
          <div className="h-6 w-40 bg-white rounded animate-pulse mb-4"></div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-400 border border-white">
              <thead className="bg-white text-gray-300">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Artikel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white">
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3"><div className="h-4 w-4 bg-white rounded animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-4 w-24 bg-white rounded animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-4 w-32 bg-white rounded animate-pulse"></div></td>
                    <td className="px-4 py-3"><div className="h-4 w-8 bg-white rounded animate-pulse"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;

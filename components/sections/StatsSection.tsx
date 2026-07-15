"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface StatsSectionProps {
  totalBooks: number;
  totalUniversities: number;
  avgPrice: number;
  subjectCounts: { subject: string; count: number }[];
}

export default function StatsSection({
  totalBooks,
  totalUniversities,
  avgPrice,
  subjectCounts,
}: StatsSectionProps) {
  return (
    <section className="bg-paper py-16">
      <div className="container-page">
        <span className="stamp-badge border-amber text-amber-dark">On the shelves right now</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink">BoiBazaar at a glance</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-card bg-white p-6 shadow-card lg:col-span-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <p className="font-display text-4xl font-bold text-ink">{totalBooks}</p>
                <p className="mt-1 text-sm text-ink/60">Active listings</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-ink">{totalUniversities}</p>
                <p className="mt-1 text-sm text-ink/60">Universities represented</p>
              </div>
              <div>
                <p className="font-display text-4xl font-bold text-ink">৳{avgPrice}</p>
                <p className="mt-1 text-sm text-ink/60">Average listing price</p>
              </div>
            </div>
          </div>

          <div className="rounded-card bg-white p-6 shadow-card lg:col-span-2">
            <p className="mb-4 text-sm font-semibold text-ink/70">Listings by subject</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={subjectCounts} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE9DF" />
                <XAxis
                  dataKey="subject"
                  tick={{ fontSize: 10, fill: "#1B2A4A" }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 11, fill: "#1B2A4A" }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #EDE9DF",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="count" fill="#E8A33D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

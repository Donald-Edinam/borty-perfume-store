"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface OverviewProps {
    data: any[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                />
                <Tooltip
                    cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '12px' }}
                />
                <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

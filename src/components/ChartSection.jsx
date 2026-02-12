import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

const COLORS = ["#FF8A65", "#4FC3F7", "#9575CD", "#F06292", "#A1887F", "#90A4AE"];

export default function ChartSection({ expenses }) {
  // spending by category
  const byCategoryData = useMemo(() => {
    const map = {};
    expenses.forEach((e) => (map[e.category] = (map[e.category] || 0) + Number(e.amount)));
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  // spending by month (YYYY-MM)
  const byMonthData = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      const ym = e.date.slice(0, 7);
      map[ym] = (map[ym] || 0) + Number(e.amount);
    });
    return Object.entries(map)
      .map(([month, value]) => ({ month, value }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [expenses]);

  return (
    <div className="charts">
      <h3>Insights</h3>
      <div className="chart-row">
        <div className="chart-card">
          <h4>Spending by Category</h4>
          {byCategoryData.length ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={byCategoryData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {byCategoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty small">No data yet</div>
          )}
        </div>

        <div className="chart-card">
          <h4>Monthly Spending</h4>
          {byMonthData.length ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={byMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="value" fill="#4FC3F7" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty small">No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const storedSales =
      JSON.parse(localStorage.getItem("pos_sales")) || [];
    setSales(storedSales);
  }, []);

  // Total Revenue
  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  // Today's Revenue
  const today = new Date().toLocaleDateString();

  const todaySales = sales.filter((sale) =>
    sale.date.includes(today)
  );

  const todayRevenue = todaySales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  // Group sales by date (for chart)
  const salesByDate = {};

  sales.forEach((sale) => {
    const date = sale.date.split(",")[0];
    if (!salesByDate[date]) {
      salesByDate[date] = 0;
    }
    salesByDate[date] += sale.total;
  });

  const chartData = Object.keys(salesByDate).map((date) => ({
    date,
    revenue: salesByDate[date],
  }));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        📊 Sales Dashboard
      </h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">
            {totalRevenue} DH
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Today's Revenue</h2>
          <p className="text-2xl font-bold text-blue-600">
            {todayRevenue} DH
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Transactions</h2>
          <p className="text-2xl font-bold">
            {sales.length}
          </p>
        </div>
      </div>

      {/* REVENUE CHART */}
      <div className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          📈 Revenue Chart
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SALES HISTORY */}
      <div className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          🧾 Sales History
        </h2>

        {sales.length === 0 && (
          <p className="text-gray-400">
            No sales yet...
          </p>
        )}

        {sales.map((sale) => (
          <div
            key={sale.id}
            className="border-b py-2 flex justify-between"
          >
            <span>{sale.date}</span>
            <span className="font-semibold">
              {sale.total} DH
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
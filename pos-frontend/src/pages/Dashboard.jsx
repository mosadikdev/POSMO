import { useEffect, useState } from "react";

export default function Dashboard() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const storedSales =
      JSON.parse(localStorage.getItem("pos_sales")) || [];
    setSales(storedSales);
  }, []);

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const today = new Date().toLocaleDateString();

  const todaySales = sales.filter((sale) =>
    sale.date.includes(today)
  );

  const todayRevenue = todaySales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        📊 Sales Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">
            {totalRevenue} DH
          </p>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Today's Revenue</h2>
          <p className="text-2xl font-bold text-blue-600">
            {todayRevenue} DH
          </p>
        </div>

        {/* Transactions */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Transactions</h2>
          <p className="text-2xl font-bold">
            {sales.length}
          </p>
        </div>
      </div>

      {/* Sales List */}
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
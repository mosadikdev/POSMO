import { useState } from "react";
import POS from "./pages/POS";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("pos");

  return (
    <div>
      {/* NAVBAR */}
      <div className="bg-black text-white p-4 flex gap-4">
        <button onClick={() => setPage("pos")}>
          POS
        </button>

        <button onClick={() => setPage("dashboard")}>
          Dashboard
        </button>
      </div>

      {page === "pos" ? <POS /> : <Dashboard />}
    </div>
  );
}
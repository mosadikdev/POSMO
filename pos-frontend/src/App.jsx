import { useState, useEffect } from "react";
import POS from "./pages/POS";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("pos");

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("pos_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("pos_user");
    setUser(null);
  };

  if (!user) return <Login setUser={setUser} />;

  return (
    <div>
      {/* NAVBAR */}
      <div className="bg-black text-white p-4 flex justify-between">
        <div className="flex gap-4">
          <button onClick={() => setPage("pos")}>
            POS
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>

            
          )}

          {user.role === "admin" && (
            <button onClick={()=>setPage("products")}>
Products
</button>

            
          )}
        </div>

        <div className="flex gap-4 items-center">
          <span>{user.username}</span>
          <button onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {page === "pos" && <POS />}
{page === "dashboard" && <Dashboard />}
{page === "products" && <AddProduct />}
    </div>
  );
}
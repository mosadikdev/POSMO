import { useState } from "react";

export default function Login({ setUser }) {
  const [role, setRole] = useState("cashier");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const adminCode = "123456";
  const cashierCode = "654321";

  const handleLogin = () => {
    if (code.length !== 6) {
      setError("Code must be 6 digits");
      return;
    }

    if (role === "admin" && code === adminCode) {
      const user = { role: "admin" };
      localStorage.setItem("pos_user", JSON.stringify(user));
      setUser(user);
    } else if (role === "cashier" && code === cashierCode) {
      const user = { role: "cashier" };
      localStorage.setItem("pos_user", JSON.stringify(user));
      setUser(user);
    } else {
      setError("Invalid code");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80">

        <h1 className="text-2xl font-bold mb-6 text-center">
          POS Login
        </h1>

        {/* ROLE RADIO */}
        <div className="flex justify-around mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cashier"
              checked={role === "cashier"}
              onChange={() => setRole("cashier")}
            />
            Cashier
          </label>
        </div>

        {/* CODE INPUT */}
        <input
          type="password"
          placeholder="Enter 6 digit code"
          className="w-full p-2 border rounded mb-4 text-center tracking-widest"
          value={code}
          maxLength={6}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>

      </div>
    </div>
  );
}
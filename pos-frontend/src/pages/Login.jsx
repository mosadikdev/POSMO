import { useState } from "react";

export default function Login({ setUser }) {
  const [role, setRole] = useState("cashier");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const adminCode = "123456";
  const cashierCode = "654321";

  const addDigit = (digit) => {
    if (code.length < 6) {
      setCode(code + digit);
    }
  };

  const clearCode = () => {
    setCode("");
  };

  const deleteDigit = () => {
    setCode(code.slice(0, -1));
  };

  const handleLogin = () => {
    if (code.length !== 6) {
      setError("Enter 6 digits");
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
      setCode("");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80">

        <h1 className="text-2xl font-bold mb-6 text-center">
          POS Login
        </h1>

        {/* ROLE */}
        <div className="flex justify-around mb-4">
          <label className="flex gap-2">
            <input
              type="radio"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={role === "cashier"}
              onChange={() => setRole("cashier")}
            />
            Cashier
          </label>
        </div>

        {/* CODE DISPLAY */}
        <div className="border p-3 text-center text-2xl tracking-widest mb-4">
          {code.replace(/./g, "•")}
        </div>

        {/* PIN PAD */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <button
              key={n}
              onClick={() => addDigit(n)}
              className="bg-gray-200 p-3 rounded text-xl hover:bg-gray-300"
            >
              {n}
            </button>
          ))}

          <button
            onClick={clearCode}
            className="bg-red-400 text-white p-3 rounded"
          >
            C
          </button>

          <button
            onClick={() => addDigit(0)}
            className="bg-gray-200 p-3 rounded text-xl"
          >
            0
          </button>

          <button
            onClick={deleteDigit}
            className="bg-yellow-400 p-3 rounded"
          >
            ⌫
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-2">
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
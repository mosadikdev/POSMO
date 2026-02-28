import { useState } from "react";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("cashier");

  const handleLogin = () => {
    const userData = { username, role };
    localStorage.setItem("pos_user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">
          POS Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="cashier">Cashier</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
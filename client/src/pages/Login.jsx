import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const API = import.meta.env.VITE_AUTH_API;
  if (!API) {
    console.error("VITE_API_URL is not defined in client/.env");
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server ${res.status}: ${txt || "Unknown error"}`);
      }

      const data = await res.json();

      if (data.token) {
        login(data.token);
        nav("/dashboard");
      } else {
        throw new Error("No token returned");
      }
    } catch (err) {
      alert(err.message || "Login failed");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-700">
          Login to your account
        </h2>
        <input
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
          Login
        </button>
        <Link
          to="/signup"
          className="text-sm text-blue-600 hover:underline block text-center"
        >
          Create account
        </Link>
      </form>
    </div>
  );
}
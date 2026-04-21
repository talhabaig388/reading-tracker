import { useState } from "react";
import axios from "../api/axios";

function Login() {
  const [mode, setMode] = useState("admin"); // "admin" | "user"

  // admin fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // user fields
  const [name, setName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // 🔐 ADMIN LOGIN
  const handleAdminLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/admin";
    } catch {
      alert("Invalid admin credentials");
    }
  };

  // 👤 USER LOGIN (generic password 123456)
  const handleUserLogin = async () => {
    try {
      if (userPassword !== "123456") {
        return alert("Password must be 123456");
      }

      // You can use either endpoint:
      // 1) public-login (no password required)
      // 2) readerLogin (requires name exists + 123456)

      const res = await axios.post("/api/auth/public-login", {
        name,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/";
    } catch {
      alert("User login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow w-80">

        {/* 🔘 TOGGLE */}
        <div className="flex mb-4 rounded overflow-hidden">
          <button
            className={`w-1/2 py-2 ${
              mode === "admin" ? "bg-indigo-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("admin")}
          >
            Admin
          </button>

          <button
            className={`w-1/2 py-2 ${
              mode === "user" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("user")}
          >
            User
          </button>
        </div>

        {/* 🔐 ADMIN FORM */}
        {mode === "admin" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              🔐 Admin Login
            </h1>

            <input
              placeholder="Email"
              className="border p-2 mb-2 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-2 mb-3 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleAdminLogin}
              className="w-full bg-indigo-500 text-white py-2 rounded"
            >
              Login
            </button>
          </>
        )}

        {/* 👤 USER FORM */}
        {mode === "user" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              👤 User Access
            </h1>

            <input
              placeholder="Enter your name"
              className="border p-2 mb-2 w-full rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password (123456)"
              className="border p-2 mb-3 w-full rounded"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <button
              onClick={handleUserLogin}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
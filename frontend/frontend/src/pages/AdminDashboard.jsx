import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { Users, DollarSign, Clock } from "lucide-react";
import DashboardCharts from "../components/DashboardCharts";

function AdminDashboard() {
  const [readers, setReaders] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState("");
  const [selectedReader, setSelectedReader] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch readers
  const fetchReaders = async () => {
    const res = await axios.get("/api/readers");
    setReaders(res.data);
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  // Stats
  const totalReaders = readers.length;
  const totalWallet = readers.reduce((sum, r) => sum + r.walletBalance, 0);
  const totalHours = readers.reduce((sum, r) => sum + r.totalHours, 0);

  // Add Reader
  const handleAddReader = async () => {
    if (!name || !phone) return;

    await axios.post("/api/readers", {
      name,
      phone,
      region: "Pakistan",
    });

    setName("");
    setPhone("");
    fetchReaders();
  };

  // Update Hours
  const handleUpdateHours = async () => {
    if (!selectedReader || !hours) return;

    await axios.put(`/api/readers/${selectedReader}/hours`, {
      hours: Number(hours),
    });

    setHours("");
    fetchReaders();
  };



  return (
<motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
  >
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div whileHover={{ scale: 1.05 }} className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow">
          <div className="flex justify-between">
            <p>Total Readers</p>
            <Users />
          </div>
          <h2 className="text-2xl font-bold">{totalReaders}</h2>
        </div>

        <div whileHover={{ scale: 1.05 }} className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow">
          <div className="flex justify-between">
            <p>Total Wallet</p>
            <DollarSign />
          </div>
          <h2 className="text-2xl font-bold">${totalWallet}</h2>
        </div>

        <div whileHover={{ scale: 1.05 }} className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow">
          <div className="flex justify-between">
            <p>Total Hours</p>
            <Clock />
          </div>
          <h2 className="text-2xl font-bold">{totalHours}</h2>
        </div>

      </div>

      {/* FORMS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ADD READER */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-4">➕ Add Reader</h2>

          <input
            className="border p-3 mb-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-3 mb-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleAddReader}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Add Reader
          </button>
        </div>

        {/* UPDATE HOURS */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-lg font-semibold mb-4">⏱ Update Hours</h2>

          <select
            className="border p-3 mb-3 w-full rounded-lg"
            value={selectedReader}
            onChange={(e) => setSelectedReader(e.target.value)}
          >
            <option>Select Reader</option>
            {readers.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>

          <input
            className="border p-3 mb-3 w-full rounded-lg"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />

          <button
            onClick={handleUpdateHours}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Update Hours
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">📋 Readers</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="pb-3">Name</th>
              <th className="pb-3">Wallet</th>
            </tr>
          </thead>

          <tbody>
            {readers.map((r) => (
              <tr key={r._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3">{r.name}</td>
                <td className="py-3 font-semibold">${r.walletBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DashboardCharts readers={readers} />
    </motion.div>
  );
}

export default AdminDashboard;
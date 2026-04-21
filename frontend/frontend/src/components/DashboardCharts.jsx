import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function DashboardCharts({ readers }) {
  // Transform data
  const chartData = readers.map((r) => ({
    name: r.name,
    hours: r.totalHours,
    wallet: r.walletBalance,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">

      {/* HOURS CHART */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">📊 Reading Hours</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="hours" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* WALLET CHART */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">💰 Wallet Balance</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="wallet" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;
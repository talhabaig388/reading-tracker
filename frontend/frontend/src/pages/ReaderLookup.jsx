import { useState } from "react";
import axios from "../api/axios";
import Leaderboard from "../components/Leaderboard";

function ReaderLookup() {
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleLookup = async () => {
    if (!phone) {
      setError("Please enter phone number");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/readers/lookup", {
        phone,
        teamLeadId: "temp-id",
      });

      setData(res.data);
      setError("");
    } catch (err) {
      setError("Reader not found");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-3xl mb-5 font-bold">Reader Lookup</h1>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter phone number"
          className="border p-2 mb-3 w-64 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Buttons */}
        <button
          onClick={handleLookup}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "Check"}
        </button>

        <button
          onClick={() => setShowLeaderboard(true)}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
        >
          View Leaderboard
        </button>

        {/* Error */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Result */}
        {data && (
          <div className="mt-6 w-80">
            {/* Summary Card */}
            <div className="border p-4 text-center mb-4 rounded shadow">
              <p className="font-bold text-lg">{data.name}</p>
              <p>Total Hours: {data.totalHours}</p>
              <p>Wallet: ${data.walletBalance}</p>
            </div>

            {/* Work History */}
            <h2 className="text-xl mb-2 font-semibold">Work History</h2>

            <table className="w-full border rounded overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Hours</th>
                </tr>
              </thead>

              <tbody>
                {data.workHistory.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center p-3">
                      No records yet
                    </td>
                  </tr>
                ) : (
                  data.workHistory.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="border p-2 text-center">
                        {item.hours}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ FIXED: Leaderboard INSIDE return */}
      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
    </>
  );
}

export default ReaderLookup;
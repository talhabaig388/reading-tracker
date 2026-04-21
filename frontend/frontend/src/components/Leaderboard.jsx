import { useEffect, useState } from "react";
import axios from "../api/axios";

function Leaderboard({ onClose }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/api/leaderboard");

        console.log("Leaderboard API:", res.data);

        // ✅ FIX: use allTime array
        setData(res.data.allTime || []);
      } catch (err) {
        console.error("Leaderboard error:", err);
        setData([]);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          🏆 Leaderboard
        </h2>

        {data.length === 0 ? (
          <p className="text-center">No data available</p>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-2"
            >
              <span>
                {index + 1}. {item.name}
              </span>
              <span>${item.walletBalance}</span>
            </div>
          ))
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
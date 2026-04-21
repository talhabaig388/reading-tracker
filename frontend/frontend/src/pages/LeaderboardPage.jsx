import { useEffect, useState } from "react";
import axios from "../api/axios";

function LeaderboardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/api/leaderboard");
        setData(res.data?.allTime || []);
      } catch (err) {
        console.error(err);
        setData([]);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-xl font-bold mb-4 text-center">
          🏆 Leaderboard
        </h2>

        {data.length === 0 ? (
          <p className="text-center">No data available</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{index + 1}. {item.name}</span>
              <span>${item.walletBalance}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
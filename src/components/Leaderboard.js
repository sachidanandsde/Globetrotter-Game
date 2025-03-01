import { useState, useEffect } from "react";
import { getLeaderboard } from "../utils/api";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getLeaderboard();
        setLeaders(res.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      {leaders.map((user, index) => (
        <p key={index}>{user.username}: {user.score} points</p>
      ))}
    </div>
  );
}

export default Leaderboard;

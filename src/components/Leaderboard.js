import { useState, useEffect } from "react";
import { getLeaderboard } from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getLeaderboard();
        const sortedLeaders = res.data.sort((a, b) => b.score - a.score);
        setLeaders(sortedLeaders);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-gradient">
      <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInDown">
        🏆 Leaderboard 🏆
      </h1>
      <p className="fs-5 mb-3 animate__animated animate__fadeIn">🌟 See who's ruling the travel world! 🌍✨</p>
      
      <div className="card shadow-lg p-4 w-50 animate__animated animate__fadeInUp" style={{ borderRadius: "15px", background: "#ffffffd9" }}>
        {leaders.map((user, index) => (
          <div key={index} className="d-flex justify-content-between border-bottom py-2 animate__animated animate__fadeInUp">
            <span className="fw-semibold">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🎖️"} {user.username} :
            </span>
            <span className="text-primary fw-bold">{user.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;

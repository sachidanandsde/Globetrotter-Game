import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config";
import "bootstrap/dist/css/bootstrap.min.css";

function InvitedGame() {
  const { username } = useParams();
  const [score, setScore] = useState(null);
  
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/game/user-score?username=${username}`)
      .then((res) => setScore(res.data.score))
      .catch((error) => console.error("Error fetching score:", error));
  }, [username]);

  return (
    <div className="container text-center py-5">
      <h2 className="fw-bold">{username} has challenged you!</h2>
      <p className="fs-4">Their score: <span className="fw-semibold text-primary">{score}</span></p>
      <button className="btn btn-success mt-3 px-4 py-2" onClick={() => window.location.href = `/game?username=guest`}>
        ✅ Accept Challenge
      </button>
    </div>
  );
}

export default InvitedGame;
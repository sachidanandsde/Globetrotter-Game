import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config";

function InvitedGame() {
  const { username } = useParams();
  const [score, setScore] = useState(null);
  
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/game/user-score?username=${username}`).then((res) => setScore(res.data.score));
  }, []);

  return (
    <div className="p-6 text-center">
      <h2>{username} has challenged you! Their score: {score}</h2>
      <button className="mt-4 p-2 bg-green-500 text-white rounded" onClick={() => window.location.href = `/game?username=guest`}>Accept Challenge</button>
    </div>
  );
}

export default InvitedGame;

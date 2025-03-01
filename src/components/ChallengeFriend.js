import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { challengeFriend, getUserScore } from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function ChallengeFriend() {
  const [friendUsername, setFriendUsername] = useState("");
  const [inviteLink, setInviteLink] = useState(null);
  const [score, setScore] = useState(0);
  const username = "sachid123"; // Replace with actual logged-in user

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await getUserScore(username);
        setScore(res.data.score);
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };
    fetchScore();
  }, [username]);

  const handleChallenge = async () => {
    try {
      const { data } = await challengeFriend(username, friendUsername);
      const generatedLink = `http://localhost:3000/game?username=${friendUsername}&inviter=${username}&score=${score}`;
      setInviteLink(generatedLink);
    } catch (error) {
      console.error("Error challenging friend:", error);
    }
  };

  const handleShare = () => {
    if (inviteLink) {
      const message = `🌍 Join me in "The Globetrotter Challenge!" I scored ${score} points! Can you beat me? Play here: ${inviteLink}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-gradient">
      <h2 className="fw-bold mb-4 animate__animated animate__fadeInDown">🎯 Challenge a Friend</h2>
      
      <p className="fs-5 mb-3 animate__animated animate__fadeIn">
        🏆 Your Score: <span className="fw-bold text-warning">{score}</span>
      </p>

      <div className="card p-4 shadow-lg animate__animated animate__fadeInUp" style={{ width: "400px", borderRadius: "15px" }}>
        <input
          className="form-control text-center mb-3"
          type="text"
          placeholder="Enter friend's username"
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleChallenge}>
          Generate Challenge
        </button>
      </div>

      {inviteLink && (
        <div className="mt-4 text-center animate__animated animate__fadeInUp">
          <div className="card p-4 shadow-lg" style={{ borderRadius: "15px", background: "#ffffffd9" }}>
            <p className="mb-2 fw-semibold">Scan or Share this QR Code</p>
            <QRCode value={inviteLink} size={150} />
            <button className="btn btn-success mt-3 w-100" onClick={handleShare}>
              📤 Share on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChallengeFriend;

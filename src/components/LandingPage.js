import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; // Import animation library

function LandingPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    if (username) {
      try {
        await createUser(username);
        navigate(`/game?username=${username}`);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-primary text-white animate__animated animate__fadeIn">
      <h1 className="display-3 fw-bold mb-4 animate__animated animate__bounceInDown">
        🌍 The Globetrotter Challenge ✈️
      </h1>
      <p className="fs-5 mb-4 animate__animated animate__fadeInUp">
        🌟 Welcome, adventurer! 🌟<br />
        Test your travel knowledge and guess the destination! 🏝️🏔️🌆<br />
        Enter your username below to start your journey! 🎒
      </p>
      <input
        className="form-control text-center w-50 p-3 mb-3 shadow-lg"
        type="text"
        placeholder="✨ Enter your username ✨"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={handleStart}
        className="btn btn-warning btn-lg shadow-lg px-4 py-2 animate__animated animate__pulse animate__infinite"
      >
        🌍 Start Playing 🎮
      </button>
      <p className="mt-4 text-white-50 fs-5 animate__animated animate__fadeInUp">
        🔥 Challenge yourself & your friends! 🔥
      </p>
    </div>
  );
}

export default LandingPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../utils/api";
import Button from "./ui/Button";

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">The Globetrotter Challenge</h1>
      <input className="p-2 border rounded" type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Button onClick={handleStart} className="mt-4">Start Playing</Button>
    </div>
  );
}

export default LandingPage;

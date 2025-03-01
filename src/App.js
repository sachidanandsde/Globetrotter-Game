import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import ChallengeFriend from "./components/ChallengeFriend";
import InvitedGame from "./components/InvitedGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/challenge" element={<ChallengeFriend />} />
      <Route path="/invite/:username" element={<InvitedGame />} />
    </Routes>
  );
}

export default App;

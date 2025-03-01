import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import { getRandomDestination, checkAnswer, getUserScore } from "../utils/api";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Game.css"; // Import custom styles

function Game() {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getRandomDestination(username);
        setQuestion(res.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchQuestion();
  }, [username]);

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

  const handleAnswer = async (answer) => {
    setSelected(answer);
    try {
      const res = await checkAnswer(username, question.id, answer);
      setFeedback(res.data);
      if (res.data.correct) {
        setScore((prevScore) => prevScore + 10);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  return (
    <div className="game-container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <h1 className="fw-bold mb-3 text-white animate__animated animate__fadeInDown">
        🌍 Guess the Destination ✈️
      </h1>
      <p className="fs-5 fw-semibold text-light animate__animated animate__fadeInUp">
        🏆 My Score: {score}
      </p>
      {feedback?.correct && <Confetti />}

      <div className="card game-card mx-auto mt-4 p-4 shadow-lg animate__animated animate__zoomIn">
        <div className="card-body">
          <h2 className="card-title mb-3">{question?.clue}</h2>
          <p className="mb-2">🧐 Choose one option:</p>
          {question?.options.map((opt) => (
            <button
              key={opt}
              className={`btn w-100 my-2 option-btn ${selected === opt ? "btn-primary text-white" : "btn-outline-primary"}`}
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
          <p className={`mt-4 fs-5 animate__animated ${feedback.correct ? "animate__bounceIn correct-answer" : "animate__shakeX text-danger"}`}>
            {feedback.correct ? "🎉 " + feedback.message : "❌ Incorrect! Try again 😞"}
            {feedback.fun_fact && <span> 📖 {feedback.fun_fact}</span>}
          </p>
        )}

      <div className="mt-4 d-flex justify-content-center gap-3">
        <button onClick={() => window.location.reload()} className="btn btn-primary animated-btn">
          🔄 Play Again
        </button>
        <button onClick={() => window.location.href = `/game?username=${username}`} className="btn btn-success animated-btn">
          ➡️ Next Question
        </button>
      </div>

      <div className="mt-4">
        <Link to="/leaderboard" className="btn btn-warning text-dark fw-semibold me-2 animated-btn">🏅 View Leaderboard</Link>
        <Link to={`/challenge?username=${username}`} className="btn btn-danger text-white fw-semibold animated-btn">🎯 Challenge a Friend</Link>
      </div>
    </div>
  );
}

export default Game;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import { Card, CardContent } from "../components/ui/Card";
import { getRandomDestination, checkAnswer } from "../utils/api";
import Button from "./ui/Button";

function Game() {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  const fetchQuestion = async () => {
    try {
      const res = await getRandomDestination(username);
      setQuestion(res.data);
      setSelected(null);
      setFeedback(null);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [username]);

  const handleAnswer = async (answer) => {
    setSelected(answer);
    try {
      const res = await checkAnswer(username, question.id, answer);
      setFeedback(res.data);
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  const handlePlayAgain = () => {
    setSelected(null);
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-teal-400 p-6 text-center">
      {feedback?.correct && <Confetti />}

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-8">
        🌍 Guess the Destination
      </h1>

      {/* Card Container */}
      <Card className="w-full max-w-lg bg-white p-8 shadow-2xl rounded-2xl">
        <CardContent>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{question?.clue}</h2>
          <p className="text-gray-700 text-lg mb-6">Choose one option:</p>

          <div className="grid grid-cols-1 gap-4">
            {question?.options.map((opt) => (
              <Button
                key={opt}
                className={`w-full py-3 px-5 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  selected === opt
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Message */}
      {feedback && (
        <div className="mt-8 p-4 w-full max-w-md bg-white rounded-xl shadow-lg">
          {feedback.correct ? (
            <p className="text-green-600 text-2xl font-bold">✅ {feedback.message}</p>
          ) : (
            <p className="text-red-600 text-2xl font-bold">❌ Wrong answer! Try Again 😢</p>
          )}
          <p className="text-gray-700 mt-4">{feedback.fun_fact}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex gap-6">
        <Button className="bg-gray-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-gray-800" onClick={handlePlayAgain}>
          🔄 Play Again
        </Button>
        <Button className="bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-blue-800" onClick={fetchQuestion}>
          ➡️ Next Question
        </Button>
      </div>
    </div>
  );
}

export default Game;

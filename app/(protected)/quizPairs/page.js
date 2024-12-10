"use client";
import { useState } from "react";
import QuizPairs from "./quizPairs";
import QuizSingle from "./quizSingle";
export default function Page() {
  const [quiz, setQuiz] = useState("");
  // return <QuizPairs></QuizPairs>;
  return (
    <>
      <div>
        <h1 className="text-xl flex justify-center pb-4">Choose quiz</h1>
        <div className="flex space-x-6 justify-center">
          <button
            className=" bg-white text-black px-3 py-1 rounded-lg"
            onClick={() => setQuiz("pairs")}
          >
            Match Pairs
          </button>
          <button
            className=" bg-white text-black px-3 py-1 rounded-lg"
            onClick={() => setQuiz("single-choice")}
          >
            Single-choice
          </button>
        </div>
        {quiz == "pairs" && <QuizPairs />}
        {quiz == "single-choice" && <QuizSingle />}
      </div>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import QuizPairs from "./quizPairs";
import QuizBlanks from "./quizBlanks";
import QuizMultiple from "./quizMultiple";
import QuizSingle from "./quizSingle";
import ChoiceBtn from "@/components/ChoiceBtn";
export default function Page() {
  const [quiz, setQuiz] = useState("");
  // return <QuizPairs></QuizPairs>;
  useEffect(() => {
    console.log(quiz);
  }, [quiz]);
  return (
    <>
      <div>
        <h1 className="text-xl flex justify-center pb-4">Choose quiz</h1>
        <div className="flex mb-4 justify-center">
          <ChoiceBtn
            text="Match Pairs"
            stateName={setQuiz}
            stateValue="pairs"
          />
          <button
            onClick={() => setQuiz("single-choice")}
            className="bg-white px-8 mx-4 text-black py-2 rounded-lg"
          >
            sing
          </button>
          <ChoiceBtn text="Blanks" stateName={setQuiz} stateValue="blanks" />
          <ChoiceBtn
            text="Multiple-choice"
            stateName={setQuiz}
            stateValue="multiple-choice"
          />
        </div>
        {quiz == "pairs" && <QuizPairs />}
        {quiz == "single-choice" && <QuizSingle />}
        {quiz == "blanks" && <QuizBlanks />}
        {quiz == "multiple-choice" && <QuizMultiple />}
      </div>
    </>
  );
}

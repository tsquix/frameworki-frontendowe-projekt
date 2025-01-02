"use client";
import { useEffect, useState } from "react";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import QuizPairs from "./quizPairs";
import QuizBlanks from "./quizBlanks";
import QuizMultiple from "./quizMultiple";
import QuizSingle from "./quizSingle";
import ChoiceBtn from "@/components/ChoiceBtn";

import { getFirestore, doc, getDoc } from "firebase/firestore";

import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
  const [quiz, setQuiz] = useState("");
  const [hasQuiz, setHasQuiz] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const userUID = user.uid;
      fetchQuiz(userUID);
    }
  }, [user]);

  const fetchQuiz = async (userUID) => {
    try {
      const db = getFirestore();
      const quizDoc = doc(db, "quiz", userUID);
      const docSnapshot = await getDoc(quizDoc);

      if (docSnapshot.exists()) {
        setHasQuiz(true);
      }
    } catch (err) {
      console.error("Error fetching options:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  if (hasQuiz) {
    return (
      <div>
        <h1 className="text-xl flex justify-center pb-4">Choose quiz</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-6 justify-center text-nowrap md:flex md:gap-0 gap-6 mx-12">
          <ChoiceBtn
            text="Match Pairs"
            stateName={setQuiz}
            stateValue="pairs"
          />
          <ChoiceBtn
            text="Single-choice"
            stateName={setQuiz}
            stateValue="single-choice"
          />
          <ChoiceBtn text="Blanks" stateName={setQuiz} stateValue="blanks" />
          <ChoiceBtn
            text="Multi-choice"
            stateName={setQuiz}
            stateValue="multiple-choice"
          />
        </div>
        {quiz === "pairs" && <QuizPairs />}
        {quiz === "single-choice" && <QuizSingle />}
        {quiz === "blanks" && <QuizBlanks />}
        {quiz === "multiple-choice" && <QuizMultiple />}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl flex justify-center pb-4 mb-8">
        Seems like you dont have any quizzes
      </h1>
      <div className="flex mb-4 justify-center flex-col items-center">
        <Link href="/quizzes/create">
          <button
            className="py-2 px-4 bg-slate-100 rounded-lg text-black"
            onClick={() => setHasQuiz(true)}
          >
            Create new quiz
          </button>
        </Link>
      </div>
    </div>
  );
}

import { useAuth } from "@/app/lib/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function QuizBlanks() {
  const { user } = useAuth();
  const [blanks, setBlanks] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswer2, setSelectedAnswer2] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionFirstPart, setX1] = useState("");
  const [questionSecPart, setX2] = useState("");
  const [questionThirdtPart, setX3] = useState("");
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCorrect2, setIsCorrect2] = useState(false);
  const [questionParts, setQuestionParts] = useState(["", "", ""]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      const userUID = user.uid;
      fetchPairs(userUID);
    }
    // console.log();
  }, []);

  useEffect(() => {
    if (questions?.content) {
      splitQuestionContent(questions.content);
    }
  }, [questions]);

  const splitQuestionContent = (content) => {
    const parts = content.split(/\[1\]|\[2\]/);
    setQuestionParts(parts);
  };

  const fetchPairs = async (userUID) => {
    try {
      const db = getFirestore();
      const quizDoc = doc(db, "quiz", userUID);
      const docSnapshot = await getDoc(quizDoc);

      if (
        docSnapshot.exists() &&
        docSnapshot.data().questions &&
        docSnapshot.data().questions.blanks
      ) {
        setBlanks(docSnapshot.data().questions.blanks.blanksContent);
        setQuestions(docSnapshot.data().questions.blanks);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching options:", err);
    }
  };

  const handleSubmit = () => {
    if (isFirstSubmit && selectedAnswer && selectedAnswer2) {
      if (selectedAnswer != "" && selectedAnswer2 != "") {
        setIsFirstSubmit(false);
        if (
          blanks[0].correctAnswer.includes(selectedAnswer) &&
          blanks[1].correctAnswer.includes(selectedAnswer2)
        ) {
          setIsCorrect(selectedAnswer);
          setIsCorrect2(selectedAnswer2);
          setScore(score + 1);
        } else if (blanks[0].correctAnswer.includes(selectedAnswer)) {
          setIsCorrect(selectedAnswer);
        } else if (blanks[1].correctAnswer.includes(selectedAnswer2)) {
          setIsCorrect2(selectedAnswer2);
        }
      }
    }
  };
  const resetValues = () => {
    setIsFirstSubmit(true);
    setIsCorrect(false);
    setIsCorrect2(false);
    setScore(0);
    setSelectedAnswer("");
    setSelectedAnswer2("");
  };
  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }
  return (
    <div className="p-4">
      {/* Question dropdown */}
      <h2 className="text-2xl font-bold mb-4">Choose correct answers</h2>
      <span className="font-bold">Score: {score}/1</span>
      <h2 className="mb-8">Fill in blanks </h2>
      <div className="flex mt-4 items-center flex-col gap-4 md:gap-0 md:flex-row">
        <p className="text-white px-2">{questionParts[0]}</p>
        <select
          value={selectedAnswer}
          className={`text-black px-4 py-2  ${
            isCorrect
              ? "bg-green-400"
              : (isCorrect2 && !isCorrect) ||
                (!isCorrect && !isCorrect2 && !isFirstSubmit)
              ? "bg-red-400"
              : "bg-white"
          }`}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        >
          <option value="" />
          {blanks.length > 0 &&
            blanks[0].options.map((question, index) => (
              <option key={`question-${index}`}>{question}</option>
            ))}
        </select>
        <p className="text-white px-2">{questionParts[1]}</p>
        <select
          value={selectedAnswer2}
          className={`text-black px-4 py-2  ${
            isCorrect2
              ? "bg-green-400"
              : (!isCorrect2 && isCorrect) ||
                (!isCorrect && !isCorrect2 && !isFirstSubmit)
              ? "bg-red-400"
              : "bg-white"
          }`}
          onChange={(e) => setSelectedAnswer2(e.target.value)}
        >
          <option value="" />
          {blanks.length > 0 &&
            blanks[1].options.map((question, index) => (
              <option className="mx-2" key={`question-${index}`}>
                {question}
              </option>
            ))}
        </select>
        <p className="text-white px-2">{questionParts[2]}</p>
      </div>
      <div className="flex justify-center mt-12 gap-4">
        <button
          className="bg-green-300 text-black px-3 py-1 rounded-lg hover:bg-green-400 transition-colors"
          onClick={handleSubmit}
        >
          submit
        </button>
        <button
          className="bg-blue-300 hover:bg-blue-400 text-black px-3 py-1 rounded-lg transition-colors"
          onClick={resetValues}
        >
          reset
        </button>
      </div>
    </div>
  );
}

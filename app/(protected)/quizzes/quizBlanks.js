import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function QuizBlanks() {
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
  useEffect(() => {
    fetchPairs();
    // console.log();
  }, []);

  useEffect(() => {
    if (questions?.content) {
      sliceQuestionContent();
    }
  }, [questions]);
  const sliceQuestionContent = () => {
    if (!questions.content) return;
    let z = questions.content;
    const firstIndex = z.indexOf("[1]");
    const secIndex = z.indexOf("[2]");

    const newX1 = z.slice(0, firstIndex);
    const newX2 = z.slice(firstIndex + 3, secIndex);
    const newX3 = z.slice(secIndex + 3, z.length);

    setX1(newX1);
    setX2(newX2);
    setX3(newX3);
  };

  const fetchPairs = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      if (
        quizDoc &&
        quizDoc.data().questions &&
        quizDoc.data().questions.blanks
      ) {
        setBlanks(quizDoc.data().questions.blanks[0].blanksContent);
        setQuestions(quizDoc.data().questions.blanks[0]);
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

  return (
    <div className="p-4">
      {/* Question dropdown */}
      <h2 className="text-2xl font-bold mb-4">Choose correct answers</h2>
      <span className="font-bold">Score: {score}/1</span>
      <h2 className="my-8">Fill in blanks </h2>
      <div className="flex mt-4 items-center">
        <p className="text-white px-2">{questionFirstPart}</p>
        <select
          value={selectedAnswer}
          className={`text-black px-4 py-2  ${
            isCorrect
              ? "bg-green-400"
              : isCorrect2 && !isCorrect
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
        <p className="text-white px-2">{questionSecPart}</p>
        <select
          value={selectedAnswer2}
          className={`text-black px-4 py-2  ${
            isCorrect2
              ? "bg-green-400"
              : isCorrect && !isCorrect2
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
        <p className="text-white px-2">{questionThirdtPart}</p>
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

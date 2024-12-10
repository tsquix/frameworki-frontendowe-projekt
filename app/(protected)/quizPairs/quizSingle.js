"use client";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const QuizPairsGame = () => {
  const [gameState, setGameState] = useState("edit"); // 'edit' | 'play'
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState("");
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  // Stan dla formularza dodawania nowej pary
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    fetchPairs();

    // console.log(questions);
  });

  const fetchPairs = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      if (
        quizDoc &&
        quizDoc.data().questions &&
        quizDoc.data().questions.options
      ) {
        setOptions(quizDoc.data().questions.options);
        setQuestions(quizDoc.data().questions);
      }
    } catch (err) {
      console.error("Error fetching options:", err);
    }
  };

  const handleKeyClick = (option) => {
    selectedOption.includes(option.value)
      ? setSelectedOption("")
      : setSelectedOption(option.value);
  };
  const handleSubmit = () => {
    if (isFirstSubmit) {
      if (selectedOption != "") {
        setIsFirstSubmit(false);
        if (questions.correctAnswerIds.includes(selectedOption)) {
          setIsCorrect(selectedOption);
          setScore(score + 1);
        } else {
          setIsCorrect(questions.correctAnswerIds[0]);
        }
      }
    }
  };
  const resetValues = () => {
    setIsFirstSubmit(true);
    setIsCorrect("");
    setScore(0);
    setSelectedOption("");
  };
  useEffect(() => {
    //TODO shuffle it
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, []);
  // const textOption = options.map((option) => option.type == "text");
  // console.log("xd", textOption);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Choose correct answer</h2>
      <span className="font-bold">Score: {score}/1</span>

      <h2>Question: {questions.title} </h2>
      {options
        .filter((option) => option.type === "text")
        .map((option, index) => (
          <div
            key={`key-${index}`}
            onClick={() => handleKeyClick(option)}
            className={`flex items-center gap-4 m-4 bg-white shadow text-black p-4 rounded-lg cursor-pointer transition-colors ${
              selectedOption.includes(option.value)
                ? "bg-blue-200"
                : "bg-white hover:bg-gray-100"
            } ${
              isCorrect == option.value && !isFirstSubmit
                ? "bg-green-400 hover:bg-green-300"
                : ""
            } ${
              !isCorrect.includes(option.value) && !isFirstSubmit
                ? "bg-red-400 hover:bg-red-300"
                : ""
            } shadow`}
          >
            <span className="flex-1">{option.value}</span>
            {/* <button
            // onClick={() => removePair(index)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"+
          >
            Remove
          </button> */}
          </div>
        ))}
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
};

export default QuizPairsGame;

"use client";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import ChoiceBtn from "@/components/ChoiceBtn";

const QuizSingle = () => {
  const [answerType, setAnswerType] = useState("text");
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
  //TODO fix loop
  useEffect(() => {
    fetchPairs();

    // console.log(questions.correctAnswer.includes(selectedOption));
    console.log(options);
  }, []);

  const fetchPairs = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      if (
        quizDoc &&
        quizDoc.data().questions &&
        quizDoc.data().questions.singleChoice
      ) {
        setOptions(quizDoc.data().questions.singleChoice[0].options);
        setQuestions(quizDoc.data().questions.singleChoice[0]);
      }
    } catch (err) {
      console.error("Error fetching pairs:", err);
    }
  };

  const handleKeyClick = (option) => {
    if (isFirstSubmit) {
      selectedOption.includes(option.value)
        ? setSelectedOption("")
        : setSelectedOption(option.value);
    }
  };
  const handleSubmit = () => {
    if (isFirstSubmit) {
      if (selectedOption != "") {
        setIsFirstSubmit(false);
        if (questions.correctAnswer.includes(selectedOption)) {
          setIsCorrect(selectedOption);
          setScore(score + 1);
        } else {
          setIsCorrect(questions.correctAnswer);
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
  if (answerType === "") {
    return (
      <div className="p-4">
        <h2 className="text-2xl mb-4 ">choose answer type:</h2>
        <button
          onClick={() => setAnswerType("text")}
          className="bg-white px-8 mx-4 text-black py-2 rounded-lg"
        >
          text
        </button>
        <button
          onClick={() => setAnswerType("images")}
          className="bg-white px-8 mx-4 text-black py-2 rounded-lg"
        >
          images
        </button>
      </div>
    );
  }
  if (answerType === "text") {
    return (
      <div className="p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Choose correct answers</h2>
          <button
            onClick={() => {
              setAnswerType("");
              resetValues();
            }}
            className="bg-gray-700 opacity-90 rounded-3xl px-2"
          >
            Switch answer type
          </button>
        </div>
        <span className="font-bold">Score: {score}/1</span>

        <h2>Question: {questions.title} </h2>
        {options.length > 0 &&
          options
            .filter((option) => option.type === "text")
            .map((option, index) => (
              <div
                key={`key-${index}`}
                onClick={() => handleKeyClick(option)}
                className={`flex items-center gap-4 m-4  shadow text-black p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedOption.includes(option.value)
                    ? "bg-blue-200"
                    : "bg-white hover:bg-gray-100"
                } ${
                  isCorrect == option.value && !isFirstSubmit
                    ? "bg-green-400 "
                    : ""
                } ${
                  !isCorrect.includes(option.value) && !isFirstSubmit
                    ? "bg-red-400 "
                    : ""
                } shadow`}
              >
                <span className="flex-1">{option.value}</span>
                {/* <button
              // onClick={() => removePair(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
  }
  if (answerType === "images") {
    return (
      <div className="p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Choose correct answers</h2>
          <button
            onClick={() => {
              setAnswerType("");
              resetValues();
            }}
            className="bg-gray-700 opacity-90 rounded-3xl px-2"
          >
            Switch answer type
          </button>
        </div>
        <span className="font-bold">Score: {score}/1</span>

        <h2>Question: {questions.title} </h2>
        {options.length > 0 &&
          options
            .filter((option) => option.type === "image")
            .map((option, index) => (
              <div
                key={`key-${index}`}
                onClick={() => handleKeyClick(option)}
                className={`flex items-center gap-4 m-4  shadow text-black p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedOption.includes(option.value)
                    ? "bg-blue-200"
                    : "bg-white hover:bg-gray-100"
                } ${
                  isCorrect == option.value && !isFirstSubmit
                    ? "bg-green-400 "
                    : ""
                } ${
                  !isCorrect.includes(option.value) && !isFirstSubmit
                    ? "bg-red-400 "
                    : ""
                } shadow`}
              >
                <img src={option.imgSrc} alt="" className="h-[260px] w-full" />
                {/* <button
              // onClick={() => removePair(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
  }
};

export default QuizSingle;

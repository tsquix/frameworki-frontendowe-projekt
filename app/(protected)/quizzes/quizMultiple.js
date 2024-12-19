import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function QuizMultiple() {
  const [answerType, setAnswerType] = useState("text");
  const [questions, setQuestions] = useState([]);
  const [multiple, setMultiple] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState("");
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  useEffect(() => {
    fetchPairs();
    // console.log();
  });
  useEffect(() => {
    console.log(isCorrect);
  }, [selectedOptions]);
  const fetchPairs = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      if (
        quizDoc &&
        quizDoc.data().questions &&
        quizDoc.data().questions.multiChoice
      ) {
        setMultiple(quizDoc.data().questions.multiChoice[0].options);
        setQuestions(quizDoc.data().questions.multiChoice[0]);
      }
    } catch (err) {
      console.error("Error fetching options:", err);
    }
  };

  const handleKeyClick = (option) => {
    if (isFirstSubmit) {
      if (selectedOptions.includes(option.value)) {
        setSelectedOptions(
          selectedOptions.filter((item) => item !== option.value)
        );
      } else if (selectedOptions.length < multiple.length) {
        setSelectedOptions([...selectedOptions, option.value]);
      } else {
        setSelectedOptions([selectedOptions[1], option.value]);
      }
    }
  };
  const handleSubmit = () => {
    if (isFirstSubmit) {
      //   console.log(selectedOptions.includes(""));
      if (selectedOptions.length > 0) {
        setIsFirstSubmit(false);
        if (
          selectedOptions.length === questions.correctAnswer.length &&
          selectedOptions.every((option) =>
            questions.correctAnswer.includes(option)
          )
        ) {
          setIsCorrect(true);
          setScore(score + 1);
        } else {
          setIsCorrect(false);
          //   setIsCorrect(questions.correctAnswer);
        }
      }
    }
  };
  const resetValues = () => {
    setIsFirstSubmit(true);
    setIsCorrect("");
    setScore(0);
    setSelectedOptions([]);
  };

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
  if (answerType === "text")
    return (
      <>
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
          <h2 className="">Question: {questions.title} </h2>
          {multiple.length > 0 &&
            multiple
              .filter((option) => option.type === "text")
              .map((option, index) => (
                <div
                  onClick={() => handleKeyClick(option)}
                  //TODO zrobic partialy correct zeby zaznaczona poprawna odpowiedz byla na zielono a zla czerwono
                  className={`flex items-center gap-4 m-4  shadow  text-black p-4 rounded-lg cursor-pointer transition-colors
                ${
                  selectedOptions.includes(option.value) && isCorrect
                    ? "bg-green-300"
                    : selectedOptions.includes(option.value)
                    ? "bg-blue-300"
                    : "bg-white"
                }
                    ${
                      selectedOptions.includes(option.value) &&
                      !isCorrect &&
                      !isFirstSubmit
                        ? "bg-red-300"
                        : ""
                    }
                    `}
                  key={`option-${index}`}
                >
                  {option.value}{" "}
                  {/* Upewnij się, że używasz właściwego klucza */}
                </div>
              ))}
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
      </>
    );
  if (answerType === "images")
    return (
      <>
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Choose correct answers</h2>
            <button
              onClick={() => setAnswerType("")}
              className="bg-gray-900 opacity-90 rounded-3xl px-2"
            >
              Switch answer type
            </button>
          </div>
          <span className="font-bold">Score: {score}/1</span>
          <h2 className="">Question: {questions.title} </h2>
          {multiple.length > 0 &&
            multiple
              .filter((option) => option.type === "image")
              .map((option, index) => (
                <div
                  onClick={() => handleKeyClick(option)}
                  //TODO zrobic partialy correct zeby zaznaczona poprawna odpowiedz byla na zielono a zla czerwono
                  className={`flex items-center gap-4 m-4 shadow text-black p-4 rounded-lg cursor-pointer transition-colors h-[300px]
                ${
                  selectedOptions.includes(option.value) && isCorrect
                    ? "bg-green-300"
                    : selectedOptions.includes(option.value)
                    ? "bg-blue-300"
                    : "bg-white"
                }
                    ${
                      selectedOptions.includes(option.value) &&
                      !isCorrect &&
                      !isFirstSubmit
                        ? "bg-red-300"
                        : ""
                    }
                    `}
                  key={`option-${index}`}
                >
                  <img
                    src={option.imgsrc}
                    alt=""
                    className="h-[260px] w-full"
                  />
                  {/* Upewnij się, że używasz właściwego klucza */}
                </div>
              ))}
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
      </>
    );
}

"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
export default function EditBlanks() {
  const [questionParts, setQuestionParts] = useState(["", "", ""]);
  const [questionString, setQuestionString] = useState("");
  const [blanks, setBlanks] = useState([]);
  const [titleEdit, setTitleEdit] = useState([]);
  const [optionType, setOptionType] = useState("");
  const [loading, setLoading] = useState(true);
  const [blanksData, setBlanksData] = useState({
    blanksContent: [
      { options: [""], correctAnswer: [""], id: "1" },
      { options: [""], correctAnswer: [""], id: "2" },
    ],
    content: "",
  });
  const [newOption, setNewOption] = useState({
    options: [""],
    id: "",
  });
  const [newCorrectAnswer, setNewCorrectAnswer] = useState({
    correctAnswer: [""],
    id: "",
  });

  useEffect(() => {
    fetchBlanks();

    console.log(newOption);
  }, []);
  useEffect(() => {
    // console.log(blanksData);
  }, []);

  useEffect(() => {
    if (blanks?.content) {
      splitQuestionContent(blanks.content);
    }
  }, [blanks]);

  const splitQuestionContent = (content) => {
    const parts = content.split(/\[1\]|\[2\]/);
    setQuestionParts(parts);
  };

  const fetchBlanks = async () => {
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
        setBlanks(quizDoc.data().questions.blanks);
        const blankData = quizDoc.data().questions.blanks;
        const content = blankData.content;

        setBlanksData({
          ...blankData,
          content,
        });
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching blanks:", err);
    }
  };

  const updateTitle = () => {
    // console.log(questionParts);
    let temp = [];
    let z = 0;
    for (let i = 0; i < questionParts.length + 2; i++) {
      if (i == 1 || i == 3) {
        temp[i] = i === 1 ? " [1] " : " [2] ";
      } else {
        temp[i] = questionParts[z];
        z++;
      }
    }
    const content = temp.join("");
    setBlanksData((prev) => ({
      ...prev,
      content,
    }));
  };

  const addNewOption = (optionId, newOption) => {
    setBlanksData((prev) => ({
      ...prev,
      blanksContent:
        optionType == "option"
          ? prev.blanksContent.map((item) =>
              item.id == optionId
                ? { ...item, options: [...item.options, newOption] }
                : item
            )
          : prev.blanksContent.map((item) =>
              item.id == optionId
                ? { ...item, correctAnswer: [newOption] }
                : item
            ),
    }));

    setNewOption({
      options: "",
      id: "",
    });
    setNewCorrectAnswer({
      correctAnswer: [""],
      id: "",
    });
    setOptionType("");
  };

  // const addNewAnswer = (optionId, newCorrectAnswer) => {
  //   setBlanksData((prev) => ({
  //     ...prev,
  //     blanksContent: prev.blanksContent.map((item) =>
  //       item.id == optionId
  //         ? { ...item, correctAnswer: [newCorrectAnswer] }
  //         : item
  //     ),
  //   }));
  // };

  const removeOption = (optionToRemove, blank) => {
    setBlanksData((prev) => ({
      ...prev,
      blanksContent: prev.blanksContent.map((item) =>
        item.id == blank
          ? {
              ...item,
              options: item.options.filter(
                (option) => !(option == optionToRemove) // Compare the option value to remove
              ),
            }
          : item
      ),
    }));
    console.log(blanksData);
  };

  const saveToFirebase = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      await updateDoc(doc(db, "quiz", quizDoc.id), {
        "questions.blanks": blanksData,
      });

      alert("blanks saved successfully!");
    } catch (err) {
      console.error("Error saving blanks:", err);
      alert("Error saving blanks");
    }
  };
  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }
  return (
    <div className="p-4">
      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">Edit Question title</h2>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              onChange={(e) =>
                setQuestionParts((prev) => {
                  const updatedParts = [...prev];
                  updatedParts[0] = e.target.value;
                  return updatedParts;
                })
              }
              placeholder="Enter first part of title"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              onChange={(e) =>
                setQuestionParts((prev) => {
                  const updatedParts = [...prev];
                  updatedParts[1] = e.target.value;
                  return updatedParts;
                })
              }
              placeholder="Enter second part of title"
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              onChange={(e) =>
                setQuestionParts((prev) => {
                  const updatedParts = [...prev];
                  updatedParts[2] = e.target.value;
                  return updatedParts;
                })
              }
              placeholder="Enter third part of title"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={updateTitle}
              className="bg-green-500 text-white px-8 py-2 text-nowrap rounded hover:bg-green-600"
            >
              Update title
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 shadow text-black mb-4">
        <div className="">
          {" "}
          <h2 className="text-xl font-bold mb-4">Title preview</h2>
        </div>
        <div className="flex flex-col sm:flex-row mt-4 items-center">
          <p className="text-black px-2">{questionParts[0]}</p>
          <select className="text-black px-4 py-2">
            <option value="" />
            {blanks?.blanksContent?.[0]?.options?.length > 0 &&
              blanks.blanksContent[0].options.map((question, index) => (
                <option key={`question-${index}`}>{question}</option>
              ))}
          </select>
          <p className="text-black px-2">{questionParts?.[1] || ""}</p>
          <select className="text-black px-4 py-2">
            <option value="" />
            {blanks?.blanksContent?.[1]?.options?.length > 0 &&
              blanks.blanksContent[1].options.map((question, index) => (
                <option className="mx-2" key={`question-${index}`}>
                  {question}
                </option>
              ))}
          </select>
          <p className="text-black px-2">{questionParts[2]}</p>
        </div>
      </div>
      <div className="bg-white p-4 shadow text-black mb-4">
        <div className="flex flex-col ">
          <h2 className="text-xl font-bold mb-4">
            Edit options / correct answers
          </h2>
          <div className="flex flex-col md:flex-row gap-2 ">
            <select
              value={newOption.id}
              onChange={(e) =>
                setNewOption((prev) => ({ ...prev, id: e.target.value }))
              }
              className="flex-1 p-2 border rounded"
            >
              <option value="">Select blank</option>
              <option value="1">First</option>
              <option value="2">Second</option>
            </select>
            <select
              value={optionType}
              onChange={(e) => setOptionType(() => e.target.value)}
              className="flex-1 p-2 border rounded"
            >
              <option value="">Select option type</option>
              <option value="option">Option</option>
              <option value="correctAnswer">Correct Answer</option>
            </select>
            <input
              type="text"
              value={newOption.options[0] || ""}
              onChange={(e) =>
                setNewOption((prev) => ({
                  ...prev,
                  options: [e.target.value],
                }))
              }
              placeholder="Enter option value"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => addNewOption(newOption.id, newOption.options[0])}
              className="bg-green-500 text-white px-8 py-2  rounded hover:bg-green-600 text-nowrap"
            >
              {" "}
              {optionType == "correctAnswer" ? "Set answer" : "Add option"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shadow text-black mb-4">
        <>
          <div className="flex flex-wrap gap-12 ">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-4">First blank options</h2>
              {blanksData?.blanksContent?.[0]?.options?.length > 0 &&
                blanksData.blanksContent[0].options.map((question, index) => (
                  <div
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 my-1 rounded justify-between"
                    key={`question-${index}`}
                  >
                    <span>{question}</span>
                    <button
                      onClick={() => removeOption(question, 1)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              <div>
                <h3 className="text-md font-bold mt-4">Correct answer</h3>
                {blanksData?.blanksContent[0].correctAnswer?.length > 0 &&
                  blanksData?.blanksContent[0]?.correctAnswer?.map(
                    (question, index) => (
                      <div
                        className="flex items-center gap-2 bg-green-300 px-3 py-1 my-1 rounded"
                        key={`question-${index}`}
                      >
                        <span>{question}</span>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-4">Second blank options</h2>
              {blanksData?.blanksContent?.[1]?.options?.length > 0 &&
                blanksData?.blanksContent[1]?.options?.map(
                  (question, index) => (
                    <div
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 my-1 rounded justify-between"
                      key={`question-${index}`}
                    >
                      <span>{question}</span>
                      <button
                        onClick={() => removeOption(question, 2)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  )
                )}
              <div>
                <h3 className="text-md font-bold mt-4">Correct answer</h3>
                {blanksData?.blanksContent?.[1]?.correctAnswer?.length > 0 &&
                  blanksData.blanksContent[1].correctAnswer.map(
                    (question, index) => (
                      <div
                        className="flex items-center gap-2 bg-green-300 px-3 py-1 my-1 rounded"
                        key={`question-${index}`}
                      >
                        <span>{question}</span>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </>
        {/* <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Edit correct Answers</h2>
            <div className=" flex gap-2">
              <select
                value={newCorrectAnswer.id}
                onChange={(e) =>
                  setNewCorrectAnswer((prev) => ({
                    ...prev,
                    id: e.target.value,
                  }))
                }
                className="flex-1 p-2 border rounded"
              >
                <option value="">Select blank</option>
                <option value="1">First</option>
                <option value="2">Second</option>
              </select>
              <input
                type="text"
                value={newCorrectAnswer.correctAnswer[0]}
                onChange={(e) =>
                  setNewCorrectAnswer((prev) => ({
                    ...prev,
                    correctAnswer: [e.target.value], 
                  }))
                }
                placeholder="Enter option value"
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={() =>
                addNewAnswer(
                  newCorrectAnswer.id,
                  newCorrectAnswer.correctAnswer[0]
                )
              }
              className="bg-green-500 text-white px-8 py-2 my-4 rounded hover:bg-green-600"
            >
              {" "}
              Set answer
            </button>{" "}
          </div> */}
      </div>

      <div className="mt-4">
        <button
          onClick={saveToFirebase}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}

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

export default function EditChoice({ type }) {
  const [loading, setLoading] = useState(true);
  const [choiceData, setChoiceData] = useState({
    title: "",
    correctAnswer: [],
    options: [],
  });

  const [newOption, setNewOption] = useState({
    type: "",
    value: "",
    imgSrc: "",
  });

  const [questionEdit, setQuestionEdit] = useState({
    title: "",
    correctAnswer: "",
  });

  useEffect(() => {
    fetchChoiceData();
  }, [type]);

  const fetchChoiceData = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      if (quizDoc?.data()?.questions) {
        const questionData =
          type === "multi"
            ? quizDoc.data().questions.multiChoice[0]
            : quizDoc.data().questions.singleChoice[0];

        const correctAnswer = Array.isArray(questionData.correctAnswer)
          ? questionData.correctAnswer
          : questionData.correctAnswer
          ? [questionData.correctAnswer]
          : [];

        setChoiceData({
          ...questionData,
          correctAnswer,
        });
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching choice data:", err);
    }
  };

  const addOption = () => {
    if (!newOption.type || !newOption.value) {
      alert("Type and value are required!");
      return;
    }

    if (newOption.type === "image" && !newOption.imgSrc) {
      alert("Image source is required for image type options!");
      return;
    }

    const optionToAdd = {
      type: newOption.type,
      value: newOption.value,
      ...(newOption.type === "image" && { imgSrc: newOption.imgSrc }),
    };

    setChoiceData((prev) => ({
      ...prev,
      options: [...prev.options, optionToAdd],
    }));

    setNewOption({
      type: "",
      value: "",
      imgSrc: "",
    });
  };

  const addCorrectAnswer = () => {
    if (!questionEdit.correctAnswer) return;

    setChoiceData((prev) => ({
      ...prev,
      correctAnswer:
        type === "single"
          ? [questionEdit.correctAnswer]
          : [...prev.correctAnswer, questionEdit.correctAnswer],
    }));

    setQuestionEdit((prev) => ({ ...prev, correctAnswer: "" }));
  };

  const removeCorrectAnswer = (indexToRemove) => {
    setChoiceData((prev) => ({
      ...prev,
      correctAnswer: prev.correctAnswer.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const updateQuestion = () => {
    const updates = {};

    if (questionEdit.title) {
      updates.title = questionEdit.title;
    }

    if (Object.keys(updates).length === 0) {
      alert("No changes to update!");
      return;
    }

    setChoiceData((prev) => ({
      ...prev,
      ...updates,
    }));

    setQuestionEdit({
      title: "",
      correctAnswer: "",
    });
  };

  const removeOption = (optionToRemove) => {
    setChoiceData((prev) => ({
      ...prev,
      options: prev.options.filter(
        (option) =>
          !(
            option.value === optionToRemove.value &&
            option.type === optionToRemove.type
          )
      ),
    }));
  };

  const saveToFirebase = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      const path =
        type === "multi"
          ? "questions.multiChoice.0"
          : "questions.singleChoice.0";

      await updateDoc(doc(db, "quiz", quizDoc.id), {
        [path]: choiceData,
      });

      alert("Changes saved successfully!");
    } catch (err) {
      console.error("Error saving changes:", err);
      alert("Error saving changes");
    }
  };
  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }
  return (
    <div className="p-4">
      {/* Question Edit Form */}
      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">
          Edit {type === "multi" ? "Multiple" : "Single"} Choice Question
        </h2>
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            value={questionEdit.title}
            onChange={(e) =>
              setQuestionEdit((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter new question title"
            className="w-full p-2 border rounded"
          />

          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={questionEdit.correctAnswer}
              onChange={(e) =>
                setQuestionEdit((prev) => ({
                  ...prev,
                  correctAnswer: e.target.value,
                }))
              }
              placeholder={
                type === "single"
                  ? "Enter correct answer"
                  : "Enter new correct answer"
              }
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={addCorrectAnswer}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {type === "single" ? "Set Answer" : "Add Answer"}
            </button>
          </div>

          {/* Display current correct answers */}
          {choiceData.correctAnswer.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {choiceData.correctAnswer.map((answer, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-green-300 px-3 py-1 rounded"
                >
                  <span>{answer}</span>
                  <button
                    onClick={() => removeCorrectAnswer(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {questionEdit.title && (
            <button
              onClick={updateQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Question Title
            </button>
          )}
        </div>
      </div>

      {/* Current Question Display */}
      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">Current Question</h2>
        <div className="mb-2">
          <span className="font-bold">Question: </span>
          <span>{choiceData.title}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold">Correct Answer(s): </span>
          <span>{choiceData.correctAnswer.join(", ")}</span>
        </div>
      </div>

      {/* Add Option Form */}
      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">Add New Option</h2>
        <div className="flex  flex-col md:flex-row gap-4 mb-4">
          <select
            value={newOption.type}
            onChange={(e) =>
              setNewOption((prev) => ({ ...prev, type: e.target.value }))
            }
            className="flex-1 p-2 border rounded"
          >
            <option value="">Select type</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
          <input
            type="text"
            value={newOption.value}
            onChange={(e) =>
              setNewOption((prev) => ({ ...prev, value: e.target.value }))
            }
            placeholder="Enter value"
            className="flex-1 p-2 border rounded"
          />
          {newOption.type === "image" && (
            <input
              type="text"
              value={newOption.imgSrc}
              onChange={(e) =>
                setNewOption((prev) => ({ ...prev, imgSrc: e.target.value }))
              }
              placeholder="Enter image URL"
              className="flex-1 p-2 border rounded"
            />
          )}
          <button
            onClick={addOption}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Option
          </button>
        </div>
      </div>

      {/* Options List */}
      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">Options</h2>
        <div className="space-y-4">
          {choiceData.options
            .sort((a, b) => (a.type === "text" ? -1 : 1))
            .map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded"
              >
                <span className="flex-1">{option.type}</span>
                <span className="flex-1">{option.value}</span>
                {option.imgSrc && (
                  <div className="flex-1">
                    <img
                      src={option.imgSrc}
                      alt={option.value}
                      className="h-[60px] w-[60px] object-cover"
                    />
                  </div>
                )}
                <button
                  onClick={() => removeOption(option)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveToFirebase}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Save All Changes
      </button>
    </div>
  );
}

"use client";
import ChoiceBtn from "@/components/ChoiceBtn";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
export default function EditSingle() {
  const [singleChoice, setSingleChoice] = useState([]);
  const [singleChoiceOptions, setSingleChoiceOptions] = useState("");

  const [newType, setNewType] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newImgSrc, setNewImgSrc] = useState("");
  useEffect(() => {
    fetchPairs();
    console.log(singleChoice);
  }, []);

  const fetchPairs = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      if (quizDoc && quizDoc.data().questions && quizDoc.data().questions) {
        //   setQuestions(quizDoc.data().questions);
        //   setMultiChoice(quizDoc.data().questions.multiChoice);
        setSingleChoice(quizDoc.data().questions.singleChoice[0]);
        setSingleChoiceOptions(
          quizDoc.data().questions.singleChoice[0].options
        );
        // setBlanks(quizDoc.data().questions.blanks);
      }
    } catch (err) {
      console.error("Error fetching pairs:", err);
    }
  };
  const addSingle = () => {
    if (newType && newValue && !newImgSrc) {
      const newSingle = { type: newType, value: newValue };
      setSingleChoiceOptions([...singleChoiceOptions, newSingle]);
      setNewType("");
      setNewValue("");
    }
    if (newType && newValue && newImgSrc) {
      const newSingle = { type: newType, value: newValue, imgSrc: newImgSrc };
      setSingleChoiceOptions([...singleChoiceOptions, newSingle]);
      setNewType("");
      setNewValue("");
      setNewImgSrc("");
    }
  };

  // Saving to Firebase
  const saveToFirebase = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      // Update the entire options array at once
      await updateDoc(doc(db, "quiz", quizDoc.id), {
        "questions.singleChoice.0.options": singleChoiceOptions,
      });

      alert("Options saved successfully!");
    } catch (err) {
      console.error("Error saving options:", err);
      alert("Error saving options");
    }
  };

  // const saveSingleChoiceOptions = async (updatedOptions) => {
  //   try {
  //     const db = getFirestore();
  //     const quizCollection = collection(db, "quiz");
  //     const querySnapshot = await getDocs(quizCollection);
  //     const quizDoc = querySnapshot.docs[0];

  //     if (quizDoc) {
  //       const currentData = quizDoc.data();

  //       // Zaktualizuj lokalnie dane w obiekcie `questions`
  //       const updatedQuestions = {
  //         ...currentData.questions,
  //         singleChoice: [
  //           {
  //             ...currentData.questions.singleChoice[0],
  //             options: updatedOptions, // Ustaw zaktualizowane opcje
  //           },
  //         ],
  //       };

  //       // Zapisz zmienione dane do Firebase
  //       await updateDoc(doc(db, "quiz", quizDoc.id), {
  //         questions: updatedQuestions,
  //       });

  //       console.log("Single choice options saved to Firebase!");
  //     }
  //   } catch (err) {
  //     console.error("Error saving single choice options:", err);
  //   }
  // };

  // const addSingle = () => {
  //   if (newKey && newValue) {
  //     const newSingle = { key: newKey, value: newValue };
  //     setPairs([...pairs, newPair]);
  //     setNewKey("");
  //     setNewValue("");
  //   }
  // };
  // const removePair = (index) => {
  //   const newPairs = pairs.filter((_, idx) => idx !== index);
  //   setPairs(newPairs);
  // };
  const removeSingle = (option) => {
    const newSingle = singleChoiceOptions.filter(
      (item) => !(item.value === option.value && item.type === option.type)
    );
    setSingleChoiceOptions(newSingle);
  };

  return (
    <div className="p-4">
      {/* Formularz dodawania nowej pary */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow text-black">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Enter type ('text' or 'image')"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter value (e.g. Paris)"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            value={newImgSrc}
            onChange={(e) => setNewImgSrc(e.target.value)}
            placeholder="If type img, enter img src"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addSingle}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Single choice
          </button>
        </div>
      </div>

      {singleChoiceOptions.length > 0 &&
        singleChoiceOptions
          .sort((a, b) => {
            //sort zeby text byl pierwszy
            if (a.type === "text" && b.type !== "text") return -1;
            if (a.type !== "text" && b.type === "text") return 1;
            return 0;
          })
          // .filter((option) => option.type === "text")
          .map((option, index) => (
            <div
              key={`key-${index}`}
              // onClick={() => handleKeyClick(option)}
              className="flex items-center gap-4 m-4 bg-white shadow text-black p-4 rounded-lg cursor-pointer transition-colors "
            >
              <span className="flex-1">type: {option.type}</span>
              <span className="flex-1"> {option.value}</span>
              {option.imgSrc && (
                <div className="flex-1">
                  <img
                    src={option.imgSrc}
                    alt=""
                    className="h-[60px] w-[60px]"
                  />
                </div>
              )}
              <button
                onClick={() => removeSingle(option)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
      <div className="flex gap-4">
        <button
          onClick={saveToFirebase}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Pairs
        </button>
      </div>
    </div>
  );
}

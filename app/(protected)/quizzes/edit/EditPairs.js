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
export default function EditPairs() {
  const [pairs, setPairs] = useState([]);

  // Stan dla formularza dodawania nowej pary
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    fetchPairs();
    // console.log(pairs);
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
        quizDoc.data().questions.pairs
      ) {
        setPairs(quizDoc.data().questions.pairs);
      }
    } catch (err) {
      console.error("Error fetching pairs:", err);
    }
  };
  const saveToFirebase = async () => {
    try {
      const db = getFirestore();
      const quizCollection = collection(db, "quiz");
      const querySnapshot = await getDocs(quizCollection);
      const quizDoc = querySnapshot.docs[0];

      await updateDoc(doc(db, "quiz", quizDoc.id), {
        "questions.pairs": pairs,
      });

      alert("Pairs saved successfully!");
    } catch (err) {
      console.error("Error saving pairs:", err);
      alert("Error saving pairs");
    }
  };
  const addPair = () => {
    if (newKey && newValue) {
      const newPair = { key: newKey, value: newValue };
      setPairs([...pairs, newPair]);
      setNewKey("");
      setNewValue("");
    }
  };
  const removePair = (index) => {
    const newPairs = pairs.filter((_, idx) => idx !== index);
    setPairs(newPairs);
  };

  return (
    <div className="p-4">
      {/* Formularz dodawania nowej pary */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow text-black">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Enter key (e.g. Capital of France)"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter value (e.g. Paris)"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addPair}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Pair
          </button>
        </div>
      </div>

      {/* Lista istniejących par */}
      <div className="grid gap-4 mb-6">
        {pairs.length > 0 &&
          pairs.map((pair, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow text-black"
            >
              <span className="flex-1 font-semibold">{pair.key}</span>
              <span className="flex-1">{pair.value}</span>
              <button
                onClick={() => removePair(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
      </div>
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

"use client";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export default function QuizPairs() {
  const [pairs, setPairs] = useState([]);
  const [gameState, setGameState] = useState("edit"); // 'edit' | 'play'
  const [selectedPair, setSelectedPair] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [shuffledValues, setShuffledValues] = useState([]);
  const [score, setScore] = useState(0);

  // Stan dla formularza dodawania nowej pary
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    fetchPairs();
    console.log(pairs);
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

  const startGame = () => {
    // Przetasuj wartości par
    const values = pairs.map((p) => p.value);
    const shuffled = [...values].sort(() => Math.random() - 0.5);
    setShuffledValues(shuffled);
    setMatchedPairs([]);
    setScore(0);
    setGameState("play");
  };

  const handleKeyClick = (pair) => {
    if (!selectedPair) {
      setSelectedPair(pair);
    }
  };

  const handleValueClick = (value) => {
    if (selectedPair) {
      if (selectedPair.value === value) {
        // Poprawne dopasowanie
        setMatchedPairs([...matchedPairs, selectedPair]);
        setScore(score + 1);
      }
      setSelectedPair(null);
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

  if (gameState === "edit") {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Define Pairs</h2>

        {/* Formularz dodawania nowej pary */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
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
          {pairs.map((pair, index) => (
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
          <button
            onClick={startGame}
            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Match the Pairs</h2>
      <div className="mb-4">
        <span className="font-bold">
          Score: {score}/{pairs.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8 text-black">
        {/* Lewa kolumna - klucze */}
        <div className="space-y-4">
          {pairs.map((pair, index) => (
            <div
              key={`key-${index}`}
              onClick={() =>
                !matchedPairs.includes(pair) && handleKeyClick(pair)
              }
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                matchedPairs.includes(pair)
                  ? "bg-green-200"
                  : selectedPair === pair
                  ? "bg-blue-200"
                  : "bg-white hover:bg-gray-100"
              } shadow`}
            >
              {pair.key}
            </div>
          ))}
        </div>

        {/* Prawa kolumna - wartości */}
        <div className="space-y-4">
          {shuffledValues.map((value, index) => (
            <div
              key={`value-${index}`}
              onClick={() => handleValueClick(value)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                pairs.find((p) => p.value === value && matchedPairs.includes(p))
                  ? "bg-green-200"
                  : "bg-white hover:bg-gray-100"
              } shadow`}
            >
              {value}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setGameState("edit")}
        className="mt-8 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
      >
        Back to Edit
      </button>
    </div>
  );
}

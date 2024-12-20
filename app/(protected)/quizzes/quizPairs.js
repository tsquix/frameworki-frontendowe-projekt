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

  const [selectedPair, setSelectedPair] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [shuffledValues, setShuffledValues] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchPairs();

    console.log(pairs);
  }, []);

  useEffect(() => {
    const values = pairs.map((p) => p.value);
    const shuffled = [...values].sort(() => Math.random() - 0.5);
    setShuffledValues(shuffled);
    setMatchedPairs([]);
    setScore(0);
  }, [pairs]);

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
  const resetValues = () => {
    const values = pairs.map((p) => p.value);
    const shuffled = [...values].sort(() => Math.random() - 0.5);
    setShuffledValues(shuffled);
    setMatchedPairs([]);
    setScore(0);
  };
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
      <div className="mt-8 flex justify-center">
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

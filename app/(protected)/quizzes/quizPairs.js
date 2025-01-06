"use client";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "@/app/lib/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
export default function QuizPairs() {
  const { user } = useAuth();
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPair, setSelectedPair] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [shuffledValues, setShuffledValues] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (user) {
      const userUID = user.uid;
      fetchPairs(userUID);
    }

    console.log(pairs);
  }, []);

  useEffect(() => {
    const values = pairs.map((p) => p.value);
    const shuffled = [...values].sort(() => Math.random() - 0.5);
    setShuffledValues(shuffled);
    setMatchedPairs([]);
    setScore(0);
  }, [pairs]);

  const fetchPairs = async (userUID) => {
    try {
      const db = getFirestore();
      const quizDoc = doc(db, "quiz", userUID);
      const docSnapshot = await getDoc(quizDoc);

      if (
        docSnapshot.exists() &&
        docSnapshot.data().questions &&
        docSnapshot.data().questions.pairs
      ) {
        setPairs(docSnapshot.data().questions.pairs);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching options:", err);
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
  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Match the Pairs</h2>
      <div className="mb-4">
        <span className="font-bold">
          Score: {score}/{pairs.length}
        </span>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 gap-8 text-black">
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
                  ? "bg-green-300"
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
                  ? "bg-green-300"
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

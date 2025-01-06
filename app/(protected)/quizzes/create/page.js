"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDoc,
  setDoc,
} from "firebase/firestore";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
export default function Page() {
  const [hasQuiz, setHasQuiz] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // const uid = user.uid;
  useEffect(() => {
    if (user) {
      const userUID = user.uid;
      //   fetchQuiz(userUID);

      setLoading(false);
    }
  });
  const createNewQuiz = async (userUID) => {
    try {
      const db = getFirestore();
      const quizRef = doc(db, "quiz", userUID);

      const quizDoc = doc(db, "quiz", userUID);
      const docSnapshot = await getDoc(quizDoc);

      if (docSnapshot.exists()) {
        setHasQuiz(true);
      }

      // Initial quiz structure
      if (!hasQuiz) {
        const initialQuizData = {
          description: "Test your knowledge of Geography with this fun quiz!",
          questions: {
            blanks: {
              blanksContent: [
                {
                  correctAnswer: ["Amazon"],
                  id: 1,
                  options: ["Amazon", "Nile", "Yangtze"],
                },
                {
                  correctAnswer: ["Mount Everest"],
                  id: 2,
                  options: ["K2", "Kangchenjunga", "Mount Everest"],
                },
              ],
              content:
                "The [1] is the longest river, and [2] is the highest peak in the world.",
            },
            multiChoice: [
              {
                correctAnswer: ["Asia", "Africa"],
                options: [
                  {
                    type: "text",
                    value: "Asia",
                  },
                  {
                    type: "text",
                    value: "Africa",
                  },
                  {
                    type: "text",
                    value: "Europe",
                  },
                  {
                    type: "image",
                    value: "Asia",
                    imgSrc:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWE75-YMVRYn-xaBe1KLs0W6DcwR146oeUyA&s",
                  },
                  {
                    type: "image",
                    value: "Africa",
                    imgSrc:
                      "https://cdn.britannica.com/63/5363-050-90082F00/Africa-political-boundaries-continent.jpg",
                  },
                  {
                    type: "image",
                    value: "Europe",
                    imgSrc:
                      "https://european-union.europa.eu/sites/default/files/styles/embed_large/public/2024-05/european-map_en.jpg?itok=LOOq8mBS",
                  },
                ],
                title: "Select the continents with the most countries.",
              },
            ],
            pairs: [
              {
                key: "Sahara",
                value: "Largest desert in the world",
              },
              {
                key: "Nile",
                value: "Longest river in the world",
              },
              {
                key: "Mount Everest",
                value: "Highest mountain in the world",
              },
            ],
            singleChoice: [
              {
                correctAnswer: ["Asia"],
                options: [
                  {
                    type: "text",
                    value: "Asia",
                  },
                  {
                    type: "text",
                    value: "Africa",
                  },
                  {
                    type: "text",
                    value: "Europe",
                  },
                  {
                    type: "image",
                    value: "Europe",
                    imgSrc:
                      "https://european-union.europa.eu/sites/default/files/styles/embed_large/public/2024-05/european-map_en.jpg?itok=LOOq8mBS",
                  },
                  {
                    type: "image",
                    value: "Africa",
                    imgSrc:
                      "https://cdn.britannica.com/63/5363-050-90082F00/Africa-political-boundaries-continent.jpg",
                  },
                  {
                    type: "image",
                    value: "Asia",
                    imgSrc:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWE75-YMVRYn-xaBe1KLs0W6DcwR146oeUyA&s",
                  },
                ],
                title: "Which continent has the largest land area?",
              },
            ],
            title: "Geography Quiz",
          },
        };

        await setDoc(quizRef, initialQuizData);

        console.log("Quiz created successfully for user:", userUID);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };
  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }
  return (
    <>
      <div className=" mx-12">
        <h1 className="text-xl flex justify-center pb-4 mb-8">
          To help you start with creating new quizzes we d like to fill your
          quizzes with sample data
        </h1>

        <div className="flex mb-4 justify-center flex-col items-center">
          <Link href="/">
            <button
              className="py-2 px-4 bg-slate-100 rounded-lg text-black"
              onClick={() => createNewQuiz(user.uid)}
            >
              Fill with sample data
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

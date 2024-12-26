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
export default function Page() {
  const [hasQuiz, setHasQuiz] = useState(false);
  const { user } = useAuth();
  // const uid = user.uid;
  useEffect(() => {
    if (user) {
      const userUID = user.uid;
      //   fetchQuiz(userUID);
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

        // Set the document with the userUID as its ID
        await setDoc(quizRef, initialQuizData);
        console.log("Quiz created successfully for user:", userUID);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };
  return (
    <>
      <div className="px-2 py-2 flex  bg-slate-100 text-black">
        <Link href="/">
          <button className="" onClick={() => createNewQuiz(user.uid)}>
            {" "}
            Click here to create a quiz !
          </button>
        </Link>
      </div>
    </>
  );
}

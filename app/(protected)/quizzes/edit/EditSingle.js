// "use client";
// import {
//   collection,
//   doc,
//   getDocs,
//   getFirestore,
//   updateDoc,
// } from "firebase/firestore";
// import { useEffect, useState } from "react";

// export default function EditSingle() {
//   const [singleChoice, setSingleChoice] = useState({
//     title: "",
//     correctAnswer: [],
//     options: [],
//   });

//   // Form states for new option
//   const [newOption, setNewOption] = useState({
//     type: "",
//     value: "",
//     imgSrc: "",
//   });

//   // Form states for question editing
//   const [questionEdit, setQuestionEdit] = useState({
//     title: "",
//     correctAnswer: "",
//   });

//   useEffect(() => {
//     fetchSingleChoice();
//   }, []);

//   const fetchSingleChoice = async () => {
//     try {
//       const db = getFirestore();
//       const quizCollection = collection(db, "quiz");
//       const querySnapshot = await getDocs(quizCollection);
//       const quizDoc = querySnapshot.docs[0];

//       if (quizDoc?.data()?.questions?.singleChoice?.[0]) {
//         setSingleChoice(quizDoc.data().questions.singleChoice[0]);
//       }
//     } catch (err) {
//       console.error("Error fetching single choice:", err);
//     }
//   };

//   const addOption = () => {
//     if (!newOption.type || !newOption.value) {
//       alert("Type and value are required!");
//       return;
//     }

//     if (newOption.type === "image" && !newOption.imgSrc) {
//       alert("Image source is required for image type options!");
//       return;
//     }

//     const optionToAdd = {
//       type: newOption.type,
//       value: newOption.value,
//       ...(newOption.type === "image" && { imgSrc: newOption.imgSrc }),
//     };

//     setSingleChoice((prev) => ({
//       ...prev,
//       options: [...prev.options, optionToAdd],
//     }));

//     // Reset form
//     setNewOption({
//       type: "",
//       value: "",
//       imgSrc: "",
//     });
//   };

//   const removeOption = (optionToRemove) => {
//     setSingleChoice((prev) => ({
//       ...prev,
//       options: prev.options.filter(
//         (option) =>
//           !(
//             option.value === optionToRemove.value &&
//             option.type === optionToRemove.type
//           )
//       ),
//     }));
//   };

//   const updateQuestion = () => {
//     const updates = {};

//     if (questionEdit.title) {
//       updates.title = questionEdit.title;
//     }

//     if (questionEdit.correctAnswer) {
//       updates.correctAnswer = [questionEdit.correctAnswer]; // Wrap in array as per your data structure
//     }

//     if (Object.keys(updates).length === 0) {
//       alert("No changes to update!");
//       return;
//     }

//     setSingleChoice((prev) => ({
//       ...prev,
//       ...updates,
//     }));

//     // Reset form
//     setQuestionEdit({
//       title: "",
//       correctAnswer: "",
//     });
//   };

//   const saveToFirebase = async () => {
//     try {
//       const db = getFirestore();
//       const quizCollection = collection(db, "quiz");
//       const querySnapshot = await getDocs(quizCollection);
//       const quizDoc = querySnapshot.docs[0];

//       await updateDoc(doc(db, "quiz", quizDoc.id), {
//         "questions.singleChoice.0": singleChoice,
//       });

//       alert(`Changes saved successfully! `);
//       // console.log(singleChoice);
//     } catch (err) {
//       console.error("Error saving changes:", err);
//       alert("Error saving changes");
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Question Edit Form */}
//       <div className="bg-white p-4 shadow text-black mb-4">
//         <h2 className="text-xl font-bold mb-4">Edit Question</h2>
//         <div className="flex gap-4 mb-4">
//           <input
//             type="text"
//             value={questionEdit.title}
//             onChange={(e) =>
//               setQuestionEdit((prev) => ({ ...prev, title: e.target.value }))
//             }
//             placeholder="Enter new question title"
//             className="flex-1 p-2 border rounded"
//           />
//           <input
//             type="text"
//             value={questionEdit.correctAnswer}
//             onChange={(e) =>
//               setQuestionEdit((prev) => ({
//                 ...prev,
//                 correctAnswer: e.target.value,
//               }))
//             }
//             placeholder="Enter new correct answer"
//             className="flex-1 p-2 border rounded"
//           />
//           <button
//             onClick={updateQuestion}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Update Question
//           </button>
//         </div>
//       </div>

//       {/* Add Option Form */}
//       <div className="bg-white p-4 shadow text-black mb-4">
//         <h2 className="text-xl font-bold mb-4">Add New Option</h2>
//         <div className="flex gap-4 mb-4">
//           <select
//             value={newOption.type}
//             onChange={(e) =>
//               setNewOption((prev) => ({ ...prev, type: e.target.value }))
//             }
//             className="flex-1 p-2 border rounded"
//           >
//             <option value="">Select type</option>
//             <option value="text">Text</option>
//             <option value="image">Image</option>
//           </select>
//           <input
//             type="text"
//             value={newOption.value}
//             onChange={(e) =>
//               setNewOption((prev) => ({ ...prev, value: e.target.value }))
//             }
//             placeholder="Enter value"
//             className="flex-1 p-2 border rounded"
//           />
//           {newOption.type === "image" && (
//             <input
//               type="text"
//               value={newOption.imgSrc}
//               onChange={(e) =>
//                 setNewOption((prev) => ({ ...prev, imgSrc: e.target.value }))
//               }
//               placeholder="Enter image URL"
//               className="flex-1 p-2 border rounded"
//             />
//           )}
//           <button
//             onClick={addOption}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Option
//           </button>
//         </div>
//       </div>

//       {/* Current Question Display */}
//       <div className="bg-white p-4 shadow text-black mb-4">
//         <h2 className="text-xl font-bold mb-4">Current Question</h2>
//         <div className="mb-2">
//           <span className="font-bold">Question: </span>
//           <span>{singleChoice.title}</span>
//         </div>
//         <div className="mb-4">
//           <span className="font-bold">Correct Answer: </span>
//           <span>{singleChoice.correctAnswer.join(", ")}</span>
//         </div>
//       </div>

//       {/* Options List */}
//       <div className="bg-white p-4 shadow text-black mb-4">
//         <h2 className="text-xl font-bold mb-4">Options</h2>
//         <div className="space-y-4">
//           {singleChoice.options
//             .sort((a, b) => (a.type === "text" ? -1 : 1))
//             .map((option, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 p-4 border rounded"
//               >
//                 <span className="flex-1">Type: {option.type}</span>
//                 <span className="flex-1">Value: {option.value}</span>
//                 {option.imgSrc && (
//                   <div className="flex-1">
//                     <img
//                       src={option.imgSrc}
//                       alt={option.value}
//                       className="h-[60px] w-[60px] object-cover"
//                     />
//                   </div>
//                 )}
//                 <button
//                   onClick={() => removeOption(option)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Save Button */}
//       <button
//         onClick={saveToFirebase}
//         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//       >
//         Save All Changes
//       </button>
//     </div>
//   );
// }

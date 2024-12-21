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
import EditPairs from "./EditPairs";
import EditSingle from "./EditSingle";
import EditMulti from "./EditMulti";

export default function Edit() {
  const [editState, setEditState] = useState("");
  const [questions, setQuestions] = useState();
  const [multiChoice, setMultiChoice] = useState();
  const [pairs, setPairs] = useState();
  const [singleChoice, setSingleChoice] = useState();
  const [singleChoiceOptions, setSingleChoiceOptions] = useState();
  const [blanks, setBlanks] = useState();

  // Stan dla formularza dodawania nowej pary
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newTypeSingle, setTypeSingle] = useState("");
  const [newValueSingle, setValueSingle] = useState("");

  if (editState === "") {
    return (
      <div className="p-4 ">
        <h2 className="text-2xl mb-4 ">choose quiz to edit:</h2>
        <ChoiceBtn text="Pairs" stateName={setEditState} stateValue="pairs" />
        <ChoiceBtn
          text="Single Choice"
          stateName={setEditState}
          stateValue="single-choice"
        />
        <ChoiceBtn
          text="Multi Choice"
          stateName={setEditState}
          stateValue="multi-choice"
        />
        <ChoiceBtn text="Blanks" stateName={setEditState} stateValue="blanks" />
      </div>
    );
  }

  if (editState === "pairs") {
    return (
      <>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4">Edit Pairs</h2>

          <ChoiceBtn
            text="Back to edit"
            stateName={setEditState}
            stateValue={""}
          />
        </div>

        <EditPairs />
      </>
    );
  }
  if (editState === "multi-choice") {
    return (
      <>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4">Edit multi Choice</h2>

          <ChoiceBtn
            text="Back to edit"
            stateName={setEditState}
            stateValue={""}
          />
        </div>

        <EditMulti type={"multi"} />
      </>
    );
  }
  if (editState === "single-choice") {
    return (
      <>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4">Edit Single Choice</h2>

          <ChoiceBtn
            text="Back to edit"
            stateName={setEditState}
            stateValue={""}
          />
        </div>

        <EditMulti type={"single"} />
      </>
    );
  }

  //   if (editState === "single-choice") {
  //     return (
  //       <div className="p-4">
  //         <div className="flex justify-between mb-4">
  //           <h2 className="text-2xl font-bold mb-4">Edit Pairs</h2>
  //           <button
  //             onClick={() => {
  //               setEditState("");
  //             }}
  //             className="bg-gray-700 opacity-90 rounded-3xl px-2"
  //           >
  //             Switch quiz
  //           </button>
  //         </div>
  //         {/* Formularz dodawania nowej pary */}
  //         <div className="mb-6 bg-white p-4 rounded-lg shadow">
  //           <div className="flex gap-4 mb-4">
  //             <input
  //               type="text"
  //               value={newTypeSingle}
  //               onChange={(e) => setNewTypeSingle(e.target.value)}
  //               placeholder="Enter type : 'text' or 'image'"
  //               className="flex-1 p-2 border rounded"
  //             />
  //             <input
  //               type="text"
  //               value={newValueSingle}
  //               onChange={(e) => setNewValueSingle(e.target.value)}
  //               placeholder="Enter answer value (e.g. Berlin)"
  //               className="flex-1 p-2 border rounded"
  //             />
  //             <button
  //               onClick={addPair}
  //               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
  //             >
  //               Add Pair
  //             </button>
  //           </div>
  //         </div>

  //         {/* Lista istniejących par */}
  //         <div className="grid gap-4 mb-6">
  //           <span className="flex-1 font-semibold">Pytanie</span>
  //           <span className="flex-1 font-semibold">{singleChoice.title}</span>
  //           <span className="flex-1 font-semibold"> odpowiedzi</span>
  //           {singleChoiceOptions
  //             .filter((option) => option.type === "text")
  //             .map((option, index) => (
  //               <div
  //                 key={index}
  //                 className="flex items-center gap-4 bg-white p-4 rounded-lg shadow text-black"
  //               >
  //                 <span className="flex-1">{option.value}</span>
  //                 <button
  //                   onClick={() => removeSingle(option, option.type)}
  //                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  //                 >
  //                   Remove
  //                 </button>
  //               </div>
  //             ))}
  //         </div>
  //       </div>
  //     );
  //   }
}

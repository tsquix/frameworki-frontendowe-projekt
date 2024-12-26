"use client";
import ChoiceBtn from "@/components/ChoiceBtn";
import { useState } from "react";
import EditPairs from "./EditPairs";
import EditMulti from "./EditMulti";
import EditBlanks from "./EditBlanks";

export default function Edit() {
  const [editState, setEditState] = useState("");

  if (editState === "") {
    return (
      <div className=" ">
        <h1 className="text-xl flex justify-center pb-4">
          Choose quiz to edit
        </h1>
        <div className="flex justify-center">
          <ChoiceBtn
            text="Match Pairs"
            stateName={setEditState}
            stateValue="pairs"
          />
          <ChoiceBtn
            text="Single-choice"
            stateName={setEditState}
            stateValue="single-choice"
          />
          <ChoiceBtn
            text="Blanks"
            stateName={setEditState}
            stateValue="blanks"
          />
          <ChoiceBtn
            text="Multi-choice"
            stateName={setEditState}
            stateValue="multi-choice"
          />
        </div>
      </div>
    );
  }

  if (editState === "pairs") {
    return (
      <>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4">Edit Pairs</h2>

          <ChoiceBtn
            text="Back to quiz choice"
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
            text="Back to quiz choice"
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
            text="Back to quiz choice"
            stateName={setEditState}
            stateValue={""}
          />
        </div>

        <EditMulti type={"single"} />
      </>
    );
  }
  if (editState === "blanks") {
    return (
      <>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4">Edit blanks</h2>

          <ChoiceBtn
            text="Back to quiz choice"
            stateName={setEditState}
            stateValue={""}
          />
        </div>

        <EditBlanks />
      </>
    );
  }
}

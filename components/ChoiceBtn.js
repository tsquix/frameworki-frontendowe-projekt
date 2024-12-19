export default function ChoiceBtn({ text, stateName, stateValue }) {
  return (
    <button
      onClick={() => stateName(stateValue)}
      className="bg-white px-8 mx-4 text-black py-2 rounded-lg"
    >
      {text}
    </button>
  );
}
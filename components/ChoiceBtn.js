export default function ChoiceBtn({ text, stateName, stateValue }) {
  return (
    <button
      onClick={() => stateName(stateValue)}
      className="bg-white px-2 md:px-4 lg:px-8 mx-2 md:mx-4 text-black py-1 md:py-2 rounded-lg hover:bg-black border border-white hover:text-white  "
    >
      {text}
    </button>
  );
}

import { ClipLoader } from "react-spinners";

export default function LoadingSpinner(loading) {
  return (
    <div className="flex justify-center items-center ">
      <ClipLoader
        color={"#ffffff"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

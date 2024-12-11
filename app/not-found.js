import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-32">
      <h1>Nie ma takiej sciezki</h1>
      <button>
        {" "}
        <Link href="/">wroc</Link>
      </button>
    </div>
  );
}

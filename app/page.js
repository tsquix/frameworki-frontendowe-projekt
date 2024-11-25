import Image from "next/image";
import RootLayout from "./layout";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="ml-[20%] px-12 pt-12">
        <h1>Welcome to Home Page</h1>
        {/* reszta zawartości */}
      </main>
    </>
  );
}

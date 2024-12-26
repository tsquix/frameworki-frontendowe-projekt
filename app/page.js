"use client";
import Navbar from "@/components/NavBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/user/signin");
      } else if (user.emailVerified === false) {
        router.push("/user/verify");
      }
    }
  }, [user, loading, router]);

  if (loading) {
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

  return (
    <>
      <Navbar />
      <main className="max-w-7xl flex justify-center">
        <div className="">
          <h1 className="mb-12">Welcome to Home Page</h1>
          <h2 className="mb-4">Informacje o autorze</h2>
          <p>Imię i nazwisko: Filip Stochel</p>
          <p>Nr albumu: 14645</p>
          <p className="text-blue-200">
            <a href="https://github.com/tsquix/frameworki-frontendowe-projekt">
              github
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

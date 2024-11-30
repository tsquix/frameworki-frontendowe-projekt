"use client";
import Navbar from "@/components/NavBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";

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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="ml-[20%] px-12 pt-12">
        <h1>Welcome to Home Page</h1>
      </main>
    </>
  );
}

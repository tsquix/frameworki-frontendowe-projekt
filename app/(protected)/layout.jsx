"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const returnUrl = usePathname();

  useLayoutEffect(() => {
    if (!loading && !user) {
      redirect(`/user/signin?returnUrl=${returnUrl}`);
    }
  }, [user, returnUrl, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="ml-[20%] px-12 pt-12">{children}</main>
    </>
  );
}

export default Protected;

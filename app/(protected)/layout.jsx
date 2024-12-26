"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";
import { ClipLoader } from "react-spinners";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const returnUrl = usePathname();

  useLayoutEffect(() => {
    if (!loading && !user) {
      redirect(`/user/signin?returnUrl=${returnUrl}`);
    }
  }, [user, returnUrl, loading]);

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
      <main className="max-w-7xl mx-auto">{children}</main>
    </>
  );
}

export default Protected;

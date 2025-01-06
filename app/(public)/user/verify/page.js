"use client";
import { useAuth } from "@/app/lib/AuthContext";
import Navbar from "@/components/NavBar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      signOut(getAuth());
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="">
        <div className=" flex flex-col items-center justify-center h-screen mx-auto ">
          <h1 className="text-2xl bg-slate-800 px-2 py-2 rounded-lg font-bold">
            Email <span className="text-red-500">not verified</span>. Verify
            clicking on link in email send to your address {email}
          </h1>
        </div>
      </div>
    </>
  );
}

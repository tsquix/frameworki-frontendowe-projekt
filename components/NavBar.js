"use client";
import { useState } from "react";
import Link from "next/link";
import LogoutForm from "@/app/(protected)/user/signout";
import { useAuth } from "@/app/lib/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <div className="flex w-full bg-slate-100 py-8 px-8 shadow-lg mb-16">
      <div className=" gap-8 flex w-full justify-">
        <ListItem NavLink="/">Home</ListItem>
        <ListItem NavLink="/user/">Profile</ListItem>
        <ListItem NavLink="/quizzes/">Quizzes</ListItem>
        <ListItem NavLink="/quizzes/edit/">Edit quizz</ListItem>
      </div>
      <div className="gap-4 flex justify-end ">{user && <LogoutForm />}</div>

      {!user && (
        <div className="flex gap-4">
          <ListItem NavLink="/user/signin">Sign in</ListItem>
          <ListItem NavLink="/user/register">Sign Up</ListItem>
        </div>
      )}
    </div>
  );
}

const ListItem = ({ children, NavLink }) => {
  return (
    <Link href={NavLink}>
      <p className="bg-slate-100 rounded-md px-4 py-2 shadow-xl text-black border-2 border-black text-nowrap">
        {children}
      </p>
    </Link>
  );
};

"use client";
import { useState } from "react";
import Link from "next/link";
import LogoutForm from "@/app/(protected)/user/signout";
import { useAuth } from "@/app/lib/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="fixed left-0 top-0 h-screen w-1/5 bg-gray-600 shadow-lg dark:bg-dark-2">
      <div className="flex h-full flex-col justify-between p-6">
        <nav id="navbarCollapse">
          <ul className="flex flex-col space-y-4">
            <ListItem NavLink="/">Home</ListItem>
            <ListItem NavLink="/user/">Profile</ListItem>
            <ListItem NavLink="/quizzes/">Quizzes</ListItem>
          </ul>
        </nav>

        <div className="flex flex-col space-y-4">
          {!user && (
            <>
              <Link href="/user/signin">
                <p className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:inline-flex bg-slate-500 w-full shadow-lg rounded-md px-2  justify-center hover:bg-white hover:text-black hover:font-bold transition-all duration-200">
                  Sign in
                </p>
              </Link>
              <Link href="/user/register">
                <p className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:inline-flex bg-slate-500 w-full shadow-lg rounded-md px-2 justify-center hover:bg-white hover:text-black hover:font-bold transition-all duration-200">
                  Sign Up
                </p>
              </Link>
            </>
          )}
          {user && <LogoutForm />}
        </div>
      </div>
    </nav>
  );
}

const ListItem = ({ children, NavLink }) => {
  return (
    <li>
      <Link href={NavLink}>
        <p className="flex py-2 text-base font-medium text-dark hover:text-primary text-white lg:inline-flex bg-slate-500 w-full shadow-lg rounded-md px-2 hover:bg-white hover:text-black hover:font-bold transition-all duration-200">
          {children}
        </p>
      </Link>
    </li>
  );
};

"use client";
import { useState } from "react";
import Link from "next/link";
import LogoutForm from "@/app/(protected)/user/signout";
import { useAuth } from "@/app/lib/AuthContext";

export default function Navbar() {
  const [navMobileActive, setNavMobileActive] = useState(false);
  const { user } = useAuth();
  const closeMobileMenu = () => setNavMobileActive(false);
  return (
    <div className="relative">
      {/* Desktop Navbar */}
      <div className="flex w-full bg-slate-100 py-8 px-8 shadow-lg mb-16 justify-end">
        <div className="gap-8 hidden md:flex w-full">
          <ListItem NavLink="/" onClick={closeMobileMenu}>
            Home
          </ListItem>
          <ListItem NavLink="/user/" onClick={closeMobileMenu}>
            Profile
          </ListItem>
          <ListItem NavLink="/quizzes/" onClick={closeMobileMenu}>
            Quizzes
          </ListItem>
          <ListItem NavLink="/quizzes/edit/" onClick={closeMobileMenu}>
            Edit quizz
          </ListItem>
        </div>
        <div className="gap-4 hidden md:flex justify-end">
          {user && <LogoutForm />}
        </div>
        {!user && (
          <div className="hidden md:flex gap-4">
            <ListItem NavLink="/user/signin">Sign in</ListItem>
            <ListItem NavLink="/user/register">Sign Up</ListItem>
          </div>
        )}
        {/* Mobile Menu Button */}
        <div className="gap-4 md:hidden flex">
          <button onClick={() => setNavMobileActive(!navMobileActive)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`absolute md:hidden top-0 left-0 w-2/3 h-screen bg-slate-100 py-8 px-8 shadow-lg transition-transform ${
          navMobileActive ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <button
          className="mt-4 text-red-500"
          onClick={() => setNavMobileActive(false)}
        >
          X
        </button> */}
        <div className="gap-4 flex flex-col text-center">
          <ListItem NavLink="/" onClick={closeMobileMenu}>
            Home
          </ListItem>
          <ListItem NavLink="/user/" onClick={closeMobileMenu}>
            Profile
          </ListItem>
          <ListItem NavLink="/quizzes/" onClick={closeMobileMenu}>
            Quizzes
          </ListItem>
          <ListItem NavLink="/quizzes/edit/" onClick={closeMobileMenu}>
            Edit quizz
          </ListItem>
          {user && <LogoutForm />}
          {!user && (
            <div className="gap-4">
              <ListItem NavLink="/user/signin">Sign in</ListItem>
              <ListItem NavLink="/user/register">Sign Up</ListItem>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ListItem = ({ children, NavLink, onClick }) => {
  return (
    <Link href={NavLink} onClick={onClick}>
      <p className="bg-slate-100 rounded-md px-4 py-2 shadow-xl text-black border-2 border-black text-nowrap hover:text-white hover:bg-black transition-all duration-150">
        {children}
      </p>
    </Link>
  );
};

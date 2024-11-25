"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 h-screen w-1/5 bg-gray-600 shadow-lg dark:bg-dark-2">
      <div className="flex h-full flex-col justify-between p-6">
        <nav id="navbarCollapse">
          <ul className="flex flex-col space-y-4">
            <ListItem NavLink="/">Home</ListItem>
            <ListItem NavLink="/user/">Profile</ListItem>
          </ul>
        </nav>

        <div className="flex flex-col">
          <Link href="/user/signin">
            <p className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90 text-center">
              Sign in
            </p>
          </Link>

          <Link href="/signup">
            <p className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90 text-center">
              Sign Up
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const ListItem = ({ children, NavLink }) => {
  return (
    <li>
      <Link href={NavLink}>
        <p className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex">
          {children}
        </p>
      </Link>
    </li>
  );
};

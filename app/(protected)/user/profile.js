"use client";

import { useAuth } from "@/app/lib/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>user page</h1>
      {/* <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>

        {user ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-600 dark:text-gray-400">User ID</p>
              <p className="font-medium">{user.uid}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-600 dark:text-gray-400">Email Verified</p>
              <p className="font-medium">{user.emailVerified ? "Yes" : "No"}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-600 dark:text-gray-400">
                Account Created
              </p>
              <p className="font-medium">{user.metadata.creationTime}</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Last Sign In</p>
              <p className="font-medium">{user.metadata.lastSignInTime}</p>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div> */}
    </div>
  );
}

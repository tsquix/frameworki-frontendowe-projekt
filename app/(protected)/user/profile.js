"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
export default function Profile() {
  const { user } = useAuth();
  const [updateError, setError] = useState();
  const [displayName, setDisplayName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [success, setSuccess] = useState(false);
  // console.log(user);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const onSubmit = () => {
    updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL,
    })
      .then(() => {
        setSuccess(false);
        setUpdatedName(displayName);
        user.reload().then(() => {});
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-10">user page</h1>
      {updateError && <span className=" text-red-500">{updateError}</span>}

      <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>

        {user ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-600 ">Email</p>
              <p className="font-medium ">{user.email}</p>
            </div>
            <div className="border-b pb-4 flex justify-between items-center">
              <div className="flex gap-4">
                <p className="text-gray-600 ">Displayname: </p>
                <p className="text-gray-200 ">
                  {user?.displayName || updatedName || displayName}
                </p>
              </div>
              <div className="flex-col">
                <label className="text-nowrap py-2 px-2 justify-center flex">
                  edit displayName
                </label>
                <input
                  type="text"
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="font-medium text-black border rounded p-2 w-full"
                  placeholder={user.displayName}
                />
              </div>
            </div>
            <div className="border-b pb-4 flex justify-between items-center">
              <div className="flex gap-4 text-center items-center">
                <p className="text-gray-600 ">PhotoURL: </p>
                <p className="text-gray-200 ">
                  {(user?.photoURL || photoURL) && (
                    <img
                      className="w-[80px] h-[80px]"
                      src={user?.photoURL || photoURL}
                    ></img>
                  )}{" "}
                </p>
              </div>
              <div className="flex-col">
                <label className="text-nowrap py-2 px-2 justify-center flex">
                  edit photoURL
                </label>
                <input
                  type="text"
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="font-medium text-black border rounded p-2 w-full"
                  placeholder={user.photoURL}
                />
              </div>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-600 ">Email Verified</p>

              {user.emailVerified ? (
                <p className="font-medium text-green-500">Yes</p>
              ) : (
                <p className="font-medium text-red-500">No</p>
              )}
            </div>
            <button
              onClick={onSubmit}
              className="bg-blue-500 text-white rounded px-4 py-2 transition-all duration-200 hover:bg-white hover:text-blue-500 font-bold"
            >
              Submit
            </button>
            {success && (
              <span className="text-green-600 px-4">
                profile updated successfully!
              </span>
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}

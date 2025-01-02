"use client";
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { db } from "../../lib/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Profile() {
  const { user } = useAuth();
  const [updateError, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  // Form state
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    street: "",
    city: "",
    zipCode: "",
  });

  // Display state
  const [displayData, setDisplayData] = useState({
    displayName: "",
    photoURL: "",
    street: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    if (user) {
      const initialData = {
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        street: "",
        city: "",
        zipCode: "",
      };

      setFormData(initialData);
      setDisplayData(initialData);

      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const addressData = {
              street: userData.address?.street || "",
              city: userData.address?.city || "",
              zipCode: userData.address?.zipCode || "",
            };
            setFormData((prev) => ({ ...prev, ...addressData }));
            setDisplayData((prev) => ({ ...prev, ...addressData }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = (field) => {
    setDisplayData((prev) => ({ ...prev, [field]: formData[field] }));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const onSubmit = async () => {
    try {
      await updateProfile(user, {
        displayName: displayData.displayName,
        photoURL: displayData.photoURL,
      });

      await setDoc(doc(db, "users", user?.uid), {
        address: {
          city: displayData.city,
          street: displayData.street,
          zipCode: displayData.zipCode,
        },
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      setError(error.message);
    }
  };
  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }
  return (
    <div className="p-4">
      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">Email</h2>
        <div className="flex flex-col gap-4 mb-4">
          <p className="font-medium">{user?.email}</p>
        </div>
      </div>

      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">Displayname</h2>
        <div className="flex flex-col gap-4 mb-4">
          <p className="font-medium">{displayData.displayName}</p>
          <div className="flex gap-2">
            <input
              type="text"
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              className="font-medium text-black border rounded p-2 w-full"
              placeholder={displayData.displayName}
              value={formData.displayName}
            />
            <button
              onClick={() => handleUpdate("displayName")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              update name
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">Photo URL</h2>
        <div className="flex flex-col gap-4 mb-4">
          <p className="font-medium">
            {displayData.photoURL && (
              <img
                className="w-[80px] h-[80px]"
                src={displayData.photoURL}
                alt="Profile"
              />
            )}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              onChange={(e) => handleInputChange("photoURL", e.target.value)}
              className="font-medium text-black border rounded p-2 w-full"
              placeholder={displayData.photoURL}
              value={formData.photoURL}
            />
            <button
              onClick={() => handleUpdate("photoURL")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              update photo
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shadow text-black mb-4">
        <div className="grid grid-cols-3 text-center">
          <h2 className="text-xl font-bold mb-4">Street</h2>
          <h2 className="text-xl font-bold mb-4">Zipcode</h2>
          <h2 className="text-xl font-bold mb-4">City</h2>
        </div>
        <div className="flex flex-col gap-4 mb-4 text-center">
          <div className="grid grid-cols-3">
            <p className="font-medium">{displayData.street}</p>
            <p className="font-medium">{displayData.zipCode}</p>
            <p className="font-medium">{displayData.city}</p>
          </div>
          <div className="grid grid-cols-3">
            <input
              type="text"
              onChange={(e) => handleInputChange("street", e.target.value)}
              className="font-medium text-black border rounded p-2 w-full"
              placeholder={displayData.street}
              value={formData.street}
            />
            <input
              type="text"
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="font-medium text-black border rounded p-2 w-full"
              placeholder={displayData.zipCode}
              value={formData.zipCode}
            />
            <input
              type="text"
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="font-medium text-black border rounded p-2 w-full"
              placeholder={displayData.city}
              value={formData.city}
            />
          </div>
          <button
            onClick={() => {
              handleUpdate("street");
              handleUpdate("zipCode");
              handleUpdate("city");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            update address
          </button>
        </div>
      </div>

      <div className="bg-white p-4 shadow text-black mb-4">
        <h2 className="text-xl font-bold mb-4">Email Verified</h2>
        <div className="flex flex-col gap-4 mb-4">
          {user?.emailVerified ? (
            <p className="font-medium text-green-500">Yes</p>
          ) : (
            <p className="font-medium text-red-500">No</p>
          )}
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Save All Changes
      </button>

      {updateError && <span className="text-red-500">{updateError}</span>}
      {success && (
        <span className="text-green-600 px-4">Update successful!</span>
      )}
    </div>
  );
}

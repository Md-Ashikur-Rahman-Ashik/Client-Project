import React, { useContext, useEffect, useState } from "react";
import { updateProfile, updatePassword } from "firebase/auth";
import { AuthContext } from "../components/provider/AuthProvider";
import Navbar from "../components/Navbar";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile | Evenzy";
  }, []);

  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL || "");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("User not found.");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      });

      if (newPassword) {
        if (newPassword.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }
        await updatePassword(user, newPassword);
      }

      await user.reload();

      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update profile.");
    }
  };

  const placeholderImg = "https://via.placeholder.com/150";

  return (
    <div>
      <Navbar />
      <div className="mt-6 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
            Your Profile
          </h2>

          <div className="flex justify-center mb-4">
            <img
              src={photoUrl || placeholderImg}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-100 border border-red-300 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-700 bg-green-100 border border-green-300 p-2 mb-4 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (read-only)
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Leave blank to keep existing password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

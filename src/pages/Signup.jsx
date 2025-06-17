import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../components/provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, createUser, setUser, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up | Evenzy";
    if (user) navigate("/");
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const { name, email, password, photoUrl } = data;

    try {
      const result = await createUser(email, password);
      const newUser = result.user;

      await updateProfile(newUser, {
        displayName: name,
        photoURL: photoUrl,
      });

      setUser({ ...newUser, displayName: name, photoURL: photoUrl });
      navigate("/");
    } catch (err) {
      const errorMessages = {
        "auth/email-already-in-use": "Email is already registered.",
        "auth/invalid-email": "Invalid email format.",
        "auth/weak-password": "Password is too weak.",
      };

      const msg = errorMessages[err.code] || "Sign up failed. Please try again.";
      toast.error(msg);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      if (user) {
        setUser(user);
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Create Account in Evenzy
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              {...register("photoUrl", {
                required: "Photo URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                  message: "Must be a valid image URL",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.photoUrl && <p className="text-red-500 text-sm">{errors.photoUrl.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message:
                    "At least 6 characters, one uppercase and one lowercase letter",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500" />
          <span className="text-sm font-medium">Sign up with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
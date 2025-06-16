import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../components/provider/AuthProvider";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Password Reset | Evenzy";
  }, []);

  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { user, signIn, signInWithGoogle } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Reset Password
        </h2>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="you@example.com"
          />
        </div>

        <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition duration-200 mb-4">
          Send Reset Link
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-orange-600 hover:underline font-medium"
          >
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

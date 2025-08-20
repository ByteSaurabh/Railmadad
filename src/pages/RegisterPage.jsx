import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (getPasswordStrength(password) < 3) {
      setError("Password is too weak. Use at least 8 characters, uppercase, number, and symbol.");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await signOut(auth); // Sign out after registration
      setMessage("Registration successful! Please check your email for a confirmation link.");
      setStep(3);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-primary mb-2 text-center tracking-tight">Create Your Account</h2>
        <p className="text-base text-gray-600 font-medium mb-6 text-center">Join RailMadad AI for smarter railway support and advocacy.</p>
        {step === 1 && (
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); setStep(2); }}>
            <input
              type="text"
              className="w-full border-b-2 border-primary/30 p-3 rounded-t focus:outline-none focus:border-primary"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="w-full border-b-2 border-primary/30 p-3 rounded-t focus:outline-none focus:border-primary"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-indigo-600 text-white rounded-xl text-lg font-bold shadow-md transition"
            >
              Next
            </button>
          </form>
        )}
        {step === 2 && (
          <form className="space-y-6" onSubmit={handleRegister}>
            <input
              type="password"
              className="w-full border-b-2 border-primary/30 p-3 rounded-t focus:outline-none focus:border-primary"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="w-full text-xs text-gray-500 mb-2">
              Password strength: <span className={getPasswordStrength(password) >= 3 ? "text-green-600" : "text-red-600"}>{getPasswordStrength(password) >= 3 ? "Strong" : "Weak"}</span>
              <br />Use at least 8 characters, uppercase, number, and symbol.
            </div>
            <input
              type="password"
              className="w-full border-b-2 border-primary/30 p-3 rounded-t focus:outline-none focus:border-primary"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-indigo-600 text-white rounded-xl text-lg font-bold shadow-md transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              className="w-full py-2 px-4 bg-gray-100 text-primary rounded-xl mt-2"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </form>
        )}
        {step === 3 && (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold text-green-600 mb-2">Registration Successful!</h3>
            <p className="text-gray-700 mb-4">Please check your email for a confirmation link to activate your account.</p>
            <button className="py-2 px-6 bg-primary text-white rounded-xl font-bold shadow-md" onClick={() => navigate('/')}>Go to Login</button>
          </div>
        )}
        {error && <div className="text-red-500 mt-4 text-center font-semibold">{error}</div>}
        {message && <div className="text-green-500 mt-4 text-center font-semibold">{message}</div>}
      </div>
      <footer className="w-full py-6 text-center text-white text-xs opacity-80 bg-gradient-to-r from-blue-600 to-indigo-800 mt-8">&copy; 2025 RailMadad AI. All rights reserved.</footer>
    </div>
  );
};

export default RegisterPage;

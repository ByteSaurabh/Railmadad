import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const LoginModal = ({ isOpen, onClose }) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage("Google login successful. Check your email for confirmation.");
      sendEmailVerification(auth.currentUser);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async () => {
    if (role === "staff" && email !== "saurabhaasharma@gmail.com") {
      setError("Only staff email allowed for this role.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        setError("Please verify your email before logging in. Check your inbox for the confirmation link.");
        return;
      }
      setMessage("Login successful.");
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button className="absolute top-2 right-2 text-lg" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {!role ? (
          <div className="space-y-2">
            <button className="w-full py-2 px-4 bg-primary text-white rounded" onClick={() => setRole("staff")}>Login as Staff/Employee</button>
            <button className="w-full py-2 px-4 bg-secondary text-white rounded" onClick={() => setRole("user")}>Login as User</button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={e => {e.preventDefault(); role === "user" ? handleEmailLogin() : handleEmailLogin();}}>
            <input type="email" className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded">Login</button>
            {role === "user" && (
              <button type="button" className="w-full py-2 px-4 bg-blue-500 text-white rounded" onClick={handleGoogleLogin}>Login with Google</button>
            )}
            <button type="button" className="w-full py-2 px-4 bg-gray-200 text-black rounded" onClick={() => setShowForgot(true)}>Forgot Password?</button>
            <button type="button" className="w-full py-2 px-4 bg-gray-100 text-black rounded" onClick={() => setRole("")}>Back</button>
          </form>
        )}
        {showForgot && (
          <div className="mt-4">
            <input type="email" className="w-full border p-2 rounded mb-2" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="w-full py-2 px-4 bg-primary text-white rounded" onClick={handleForgotPassword}>Send Reset Link</button>
            <button className="w-full py-2 px-4 bg-gray-100 text-black rounded mt-2" onClick={() => setShowForgot(false)}>Back</button>
          </div>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {message && <div className="text-green-500 mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default LoginModal;

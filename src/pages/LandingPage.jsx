import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/ui/LoginModal";

import { useEffect } from "react";
const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  useEffect(() => {
    if (window.location.search.includes("login=true")) {
      setIsLoginOpen(true);
    }
  }, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-8 py-16 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center items-start text-left pr-0 md:pr-12 mb-12 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">RailMadad AI</h1>
          <p className="text-lg md:text-2xl text-white/90 mb-6 font-medium max-w-xl">Empowering Indian Railways with <span className="text-yellow-300 font-bold">AI-driven Advocacy</span>, <span className="text-green-300 font-bold">Smart Support</span>, and <span className="text-pink-300 font-bold">Real-time Solutions</span>.</p>
          <ul className="mb-8 space-y-3 text-white/90 text-base md:text-lg">
            <li className="flex items-center"><span className="mr-2 text-primary font-bold">✔</span> Smart Complaint Portal for quick resolutions</li>
            <li className="flex items-center"><span className="mr-2 text-primary font-bold">✔</span> Real-time IoT Monitoring & Predictive Alerts</li>
            <li className="flex items-center"><span className="mr-2 text-primary font-bold">✔</span> Passenger Rights Advocacy & Legal Resources</li>
            <li className="flex items-center"><span className="mr-2 text-primary font-bold">✔</span> Community Forum for collaborative support</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              className="flex-1 py-3 px-6 bg-primary hover:bg-indigo-600 text-white rounded-xl text-lg font-bold shadow-lg transition"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
            <button
              className="flex-1 py-3 px-6 bg-secondary hover:bg-blue-600 text-white rounded-xl text-lg font-bold shadow-lg transition"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
        {/* Hero Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <img src="/public/assets/images/no_image.png" alt="Railway AI Hero" className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-white/30" />
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <footer className="w-full py-6 text-center text-white text-xs opacity-80 bg-gradient-to-r from-blue-600 to-indigo-800">&copy; 2025 RailMadad AI. All rights reserved.</footer>
    </div>
  );
};

export default LandingPage;

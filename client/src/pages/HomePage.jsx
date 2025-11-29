import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Shield, Zap } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-35 md:pt-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/40 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/40 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to <span className="text-purple-400">QuickChat</span></h1>
        <p className="text-gray-300 mb-8 text-lg">Connect instantly with your friends in a sleek, secure and real-time chat experience.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="backdrop-blur-lg cursor-pointer bg-white/20 border border-white/30 shadow-xl text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-6 z-10">
        {[
          { icon: <MessageCircle className="w-8 h-8 text-purple-400" />, title: "Real-Time Chat", desc: "Experience seamless instant messaging." },
          { icon: <Shield className="w-8 h-8 text-purple-400" />, title: "Authenticated & Secure", desc: "Secure login/signup via email/password or Google OAuth." },
          { icon: <Zap className="w-8 h-8 text-purple-400" />, title: "Fast & Modern", desc: "Smooth and responsive interface built for speed." }
        ].map((f, i) => (
          <div key={i} className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl text-center shadow-md hover:bg-white/20 transition">
            <div className="flex justify-center mb-3">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 mb-6 text-gray-400 text-sm z-10">
        <div className="flex justify-center gap-8 mb-4">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Contact Us</a>
        </div>
        <p className="text-center">
          {new Date().getFullYear()} © QuickChat LLC | All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}



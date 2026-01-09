import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const NotFound = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-white dark:bg-[#080809] text-gray-900 dark:text-slate-100 flex flex-col items-center justify-center transition-colors relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 dark:bg-blue-950/30 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-slate-200 dark:bg-slate-800/30 rounded-full blur-3xl opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6"
      >
        {/* 404 Icon with Message Circle */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative mb-8"
        >
          <div className="flex items-center justify-center">
            <MessageCircle size={180} className="text-blue-500 dark:text-blue-400" strokeWidth={1} />
            <span className="absolute text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900 dark:text-white"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-gray-600 dark:text-slate-400 mb-8 text-center max-w-md"
        >
          Looks like this conversation drifted away. Don't worry, you can navigate back and start chatting!
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/"
            className="backdrop-blur-lg cursor-pointer bg-[#1681E3] border border-white/30 shadow-xl text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0f66b8] transition-all transform hover:scale-105 inline-block"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex space-x-2 mt-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity }}
              className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
            ></motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
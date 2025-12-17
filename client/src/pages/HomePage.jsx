import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Earth, LockKeyhole, MessageCircle, Phone, Shield, Zap } from "lucide-react";
import dashboardImage from '../../public/dashboard.png';
import Navbar from "../components/Navbar";
import reactImage from '../assets/react.svg';
import mongoImage from '../assets/mongodb-icon.svg';
import expressImage from '../assets/express.png';
import nodeImage from '../assets/Node.svg';
import { useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [visitorEmail, setVisitorEmail] = useState("");

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-slate-100 relative overflow-hidden transition-colors mt-15">


        {/* Hero Section */}
        <div className="w-full flex sm:flex-row flex-col justify-around  items-center bg-white dark:bg-[#080809] px-4 sm:px-6 md:px-1 lg:px-20  xl:px-32 py-10 sm:py-0 transition-colors">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left sm:text-left z-10 pl-5 xl:pl-0 w-80 xl:w-2/5"
          >
            <h1 className="text-4xl text-gray-900 dark:text-white md:text-3xl xl:text-6xl font-bold mb-4">Real-Time Chat, <span className="text-gray-900 dark:text-white">Build to Connect</span></h1>
            <p className="text-[#757474] dark:text-slate-300 mb-5 xl:text-lg xl:w-80">Connect instantly with your friends in a sleek, secure and real-time chat experience.</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="backdrop-blur-lg cursor-pointer bg-[#1681E3] border border-white/30 shadow-xl text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0f66b8]"
            >
              Get Started
            </motion.button>
          </motion.div>

          <div className="dashboadImage z-10 sm:min-w-40 max-w-100 xl:max-w-150 pt-10 sm:pt-0 xl:pr-10">
            <img src={dashboardImage} alt="" />
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-white dark:bg-[#080809] pt-16 pb-20 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-42 transition-colors">

          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-10 text-gray-900 dark:text-white">Features Spotlight</h2>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                icon: <MessageCircle className="w-10 h-10 text-gray-500" />,
                title: "Blazing Fast Real-Time Sync",
                desc: "Built with Socket.io messages are delivered instantly."
              },
              {
                icon: <LockKeyhole className="w-10 h-10 text-gray-500" />,
                title: "Secure User Authentication",
                desc: "Leveraging robust foundations for protected communication."
              },
              {
                icon: <Zap className="w-10 h-10 text-gray-500" />,
                title: "Reliable System Performance",
                desc: "A stable, scalable chat experience with efficient data handling."
              }
            ].map((f, i) => (
              <div
                key={i}
                className="bg-[#F1F4F5] dark:bg-[#1F1F23] p-6 rounded-xl border border-white/10 dark:border-slate-800 shadow-sm text-center transition-colors"
              >
                <div className="mb-4 flex justify-center items-center">{f.icon}</div>
                <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-[#757474] dark:text-slate-300  text-sm">{f.desc}</p>
              </div>
            ))}

          </div>
        </div>

        {/* Tech Stack Section */}
        {/* <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-42 bg-[#EFF5F7] dark:bg-[#090909] pt-16 pb-20 transition-colors">

          
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Engineered with Modern Technology</h3>
            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
              A powerful and industry-relevant tech stack chosen for its flexibility and high-performance capabilities.
            </p>


            <div className="flex gap-6 pt-5">
              <img src={mongoImage} className="w-12" />
              <img src={expressImage} className="w-12" />
              <img src={reactImage} className="w-12" />
              <img src={nodeImage} className="w-12" />
            </div>
          </div>
          <div className="md:hidden">
            <hr className="border-gray-400 dark:border-slate-700" />
          </div>



          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">See the Project in Action</h3>

            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
              A brief preview inviting you to test the features instantly.
            </p>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 py-3 rounded-md bg-[#1681E3] hover:bg-[#0f66b8] transition font-medium border border-white/20 dark:border-slate-700"
            >
              Take a Quick Tour
            </motion.button>
          </div>
        </div> */}

<div className="relative w-full h-130 flex items-center justify-center bg-white dark:bg-[#080809]">
          <div
            className="
      absolute
      h-90 w-[80%]
      rounded-3xl
      flex flex-col items-center justify-center gap-5
      text-black dark:text-white

      bg-[#F1F4F5]/20 dark:bg-[#0f1115]/40
      backdrop-blur-xl

      bg-[radial-gradient(#000000_0.85px,transparent_0.85px),radial-gradient(#000000_0.85px,#ffffff_0.85px)]
      dark:bg-[radial-gradient(#ffffff_0.6px,transparent_0.6px),radial-gradient(#ffffff_0.6px,#080809_0.6px)]

      bg-[length:34px_34px]
      bg-[position:0_0,17px_17px]
    "
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center">
              Your next conversation starts here.
            </h1>

            <p className="text-sm sm:text-lg text-center min-w-30 max-w-90">
              Talk freely, reply instantly, and stay connected without distractions or delays.
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="
        cursor-pointer
        px-6 py-3
        rounded-full
        font-semibold
        text-white
        bg-black/90 dark:bg-white/90
        dark:text-black
        border border-white/30 dark:border-black/20
        backdrop-blur-lg
        shadow-xl
      "
            >
              Get Started
            </motion.button>
          </div>
        </div>


        {/* Horizontal Line Separator */}
        <hr className="w-full border-t border-white/20 dark:border-slate-800 transition-colors" />

        {/* Footer */}
        <footer className="w-full bg-white dark:bg-[#090909] pt-16 pb-10 sm:pb-80 px-4 sm:px-6 md:px-1 lg:px-20  xl:px-42  relative overflow-hidden transition-colors">

          {/* Main Flex Container */}
          <div className="relative z-10 flex flex-wrap gap-10 text-gray-900 dark:text-slate-200 ">

            {/* Brand */}
            <div className="flex-1 min-w-[200px]">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide mb-3">
                QuickChat
              </h2>
              <p className="text-gray-700 dark:text-slate-300">
                © {new Date().getFullYear()} QuickChat — All Rights Reserved.
              </p>

              {/* Chat bubble small decorative icons */}

            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              {/* Quick Links */}
              <div className="flex-1 min-w-[150px]">
                <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="cursor-pointer">Home</Link></li>
                  <li><Link to="/feature" className="cursor-pointer">Features</Link></li>
                  <li><Link to="/about" className="cursor-pointer">About</Link></li>
                  <li><Link to="/login" className="cursor-pointer">Login</Link></li>
                </ul>
              </div>

              {/* Chat Highlights */}
              <div className="flex-1 min-w-[300px]">
                <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-3">Why QuickChat?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-500" /> Fast Real-Time Messaging</li>
                  <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-500" /> Clean & Modern Interface</li>
                  <li className="flex items-center gap-2"><Earth className="w-4 h-4 text-green-500" /> 24/7 Server Availability</li>
                </ul>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}



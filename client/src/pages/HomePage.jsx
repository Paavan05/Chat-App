import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle, Shield, Zap } from "lucide-react";
import dashboardImage from '../../public/dashboard.png';
import Navbar from "../components/Navbar";
import reactImage from '../assets/react.svg';
import mongoImage from '../assets/mongodb-icon.svg';
import expressImage from '../assets/express.png';
import nodeImage from '../assets/Node.svg';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">


        {/* Hero Section */}
        <div className="w-full flex sm:flex-row flex-col justify-around  items-center bg-[#302746] px-4 sm:px-6 md:px-1 lg:px-20  xl:px-32 py-10 sm:py-0 ">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-left sm:text-left z-10 pl-5 xl:pl-0 w-80 xl:w-2/5"
          >
            <h1 className="text-4xl md:text-3xl xl:text-6xl font-bold mb-4">Real-Time Chat, <span className="text-purple-400">Build to Connect</span></h1>
            <p className="text-gray-300 mb-5 xl:text-lg xl:w-80">Connect instantly with your friends in a sleek, secure and real-time chat experience.</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="backdrop-blur-lg cursor-pointer bg-white/20 border border-white/30 shadow-xl text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition"
            >
              Get Started
            </motion.button>
          </motion.div>

          <div className="dashboadImage z-10 sm:min-w-40 max-w-100 xl:max-w-150 pt-10 sm:pt-0 xl:pr-10">
            <img src={dashboardImage} alt="" />
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-[#3A2A4F] pt-16 pb-20 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-42 ">

          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-10 text-white">Features Spotlight</h2>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                icon: <MessageCircle className="w-10 h-10 text-purple-300" />,
                title: "Blazing Fast Real-Time Sync",
                desc: "Built with Socket.io messages are delivered instantly."
              },
              {
                icon: <Shield className="w-10 h-10 text-purple-300" />,
                title: "Secure User Authentication",
                desc: "Leveraging robust foundations for protected communication."
              },
              {
                icon: <Zap className="w-10 h-10 text-purple-300" />,
                title: "Reliable System Performance",
                desc: "A stable, scalable chat experience with efficient data handling."
              }
            ].map((f, i) => (
              <div
                key={i}
                className="bg-[#4A3863] p-6 rounded-xl border border-white/10 shadow-sm text-left"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-300 text-sm">{f.desc}</p>
              </div>
            ))}

          </div>
        </div>

        {/* Texh Stack Section */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-42 bg-[#312646] pt-16 pb-20">

          {/* Left */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Engineered with Modern Technology</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              A powerful and industry-relevant tech stack chosen for its flexibility and high-performance capabilities.
            </p>

            {/* Icons Row */}
            <div className="flex gap-6 pt-5">
              <img src={mongoImage} className="w-12" />
              <img src={expressImage} className="w-12" />
              <img src={reactImage} className="w-12" />
              <img src={nodeImage} className="w-12" />
            </div>
          </div>
          <div className="md:hidden">
            <hr className="border-gray-400" />
          </div>

          {/* Right */}

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">See the Project in Action</h3>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              A brief preview inviting you to test the features instantly.
            </p>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 py-3 rounded-md bg-[#5D4A78] hover:bg-[#6A5590] transition font-medium border border-white/20"
            >
              Take a Quick Tour
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-[#261C38] pt-16 pb-10 px-4 sm:px-6 md:px-1 lg:px-20  xl:px-42  relative overflow-hidden">

          {/* Main Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-300 ">

            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide mb-3">
                QuickChat
              </h2>
              <p className="text-gray-400">
                A fast and secure chat experience made for everyone.
              </p>

              {/* Chat bubble small decorative icons */}
              <div className="flex gap-2 mt-4">
                <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></span>
                <span className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></span>
                <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/feature" className="hover:text-white">Features</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>

            {/* Chat Highlights */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Why QuickChat?</h3>
              <ul className="space-y-2">
                <li>⚡ Fast Real-Time Messaging</li>
                {/* <li>🔐 End-to-End Protection</li> */}
                <li>📱 Clean & Modern Interface</li>
                <li>🌐 24/7 Server Availability</li>
              </ul>
            </div>

            {/* Newsletter - Chat Bubble Input */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-3">Get updates on new chat features.</p>

              <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 relative">
                <input
                  type="text"
                  placeholder="Your email…"
                  className="bg-transparent flex-1 text-white px-2  focus:outline-none"
                />
                <button className="bg-purple-500 hover:bg-purple-600 px-2  py-1 rounded-lg text-white font-medium absolute right-3">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="relative z-10 mt-14 border-t border-white/20 pt-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} QuickChat — All Rights Reserved.
          </div>
        </footer>

      </div>
    </>
  );
}



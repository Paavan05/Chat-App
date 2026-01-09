import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, MessageCircle, Zap } from "lucide-react";
import darshboard_image_light from "../assets/dashboard_image_light.png"
import darshboard_image_dark from "../assets/dashboard_image_dark.png"
import Navbar from "../components/Navbar";
import { useContext, useRef, useState } from "react";
import Footer from "../components/Footer"
import { ThemeContext } from "../../context/ThemeContext";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";


export default function HomePage() {
  const navigate = useNavigate();
  const [visitorEmail, setVisitorEmail] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext)
  

  return (
    <>
      {/* navbar */}
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-slate-100 relative overflow-hidden transition-colors">

        {/* Hero Section */}
        <div className="w-full flex flex-col pt-60 justify-around items-center bg-white dark:bg-[#080809]  transition-colors">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10 pl-5 xl:pl-0 w-80 xl:w-2/5"
          >
            <h1 className="text-4xl text-gray-900 w-full dark:text-white md:text-3xl xl:text-6xl font-bold mb-4">Real-Time Chat, <span className="text-gray-900 dark:text-white">Build to Connect</span></h1>
            <p className="text-[#757474] dark:text-slate-300 mb-5 xl:text-lg ">Connect instantly with your friends in a sleek, secure and real-time chat experience.</p>
            <motion.button
              whileHover={{ scale: 1, }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="backdrop-blur-lg cursor-pointer bg-[#1681E3] border border-white/30 shadow-xl text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0f66b8]"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* dashboard images */}
          <div className="relative w-[90%] mt-20 h-50 sm:h-110 md:h-130 lg:h-160 xl:h-180 lg:mx-20 xl:mx-43">
            <img src={theme === "dark" ? darshboard_image_dark : darshboard_image_light} alt="" className="absolute  rounded-2xl px-5 sm:px-0 w-full h-full xl:w-[88%] xl:left-21" />
            <div className="absolute bottom-0 w-full xl:w-[88%] xl:left-21 px-5 sm:px-0 h-10 sm:h-30 dark:h-30 lg:dark:h-40 bg-gradient-to-t from-white/100 to bg-transparent dark:from-black to-transparent rounded-b-2xl"></div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-white dark:bg-[#080809] py-26  px-4 sm:px-6 md:px-10 lg:px-20 xl:px-42 transition-colors">

          {/* Section Title */}
          <h2 className="text-3xl font-semibold mb-10 text-gray-900 dark:text-white">Features Spotlight</h2>

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
                className="bg-[#F1F4F5] dark:bg-[#1F1F23] p-6 py-20 rounded-xl border border-white/10 dark:border-slate-800 shadow-sm text-center transition-colors"
              >
                <div className="mb-4 flex justify-center items-center">{f.icon}</div>
                <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-[#757474] dark:text-slate-300  text-sm">{f.desc}</p>
              </div>
            ))}

          </div>
        </div>



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
        <Footer />

      </div>
    </>
  );
}



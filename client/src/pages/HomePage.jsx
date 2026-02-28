import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, MessageCircle, Zap, UserPlus, ImagePlus, Activity, UserCog } from "lucide-react";
import darshboard_image_light from "../assets/dashboard_image_light.png"
import darshboard_image_dark from "../assets/dashboard_image_dark.png"
import Navbar from "../components/Navbar";
import { useEffect, useContext, useRef, useState } from "react";
import Footer from "../components/Footer"
import { ThemeContext } from "../../context/ThemeContext";
import FeatureCard from '../components/FeatureCard';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, Draggable } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Draggable);


export default function HomePage() {
  const navigate = useNavigate();
  const [visitorEmail, setVisitorEmail] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const gsapref = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCardWidth = () => {
    if (windowWidth >= 768) return 420; // md
    if (windowWidth >= 640) return 380; // sm
    return 300; // default/mobile
  };

  // Hero image scroll animation
  useGSAP(() => {
    if (!gsapref.current) return;
    const el = gsapref.current.children[0];
    gsap.from(el, {
      opacity: 0.5,
      scale: 0.8,
      y: 150,
      duration: 1.8,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        end: "top 50%",
        toggleActions: "play none none reverse",
        scrub: 1,
      }
    });
  }, { revertOnUpdate: true, scope: gsapref });

  const sliderRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: sliderRef });

  const slideToCenter = contextSafe((index) => {
    if (!sliderRef.current) return;

    const cards = sliderRef.current.children;
    const cardWidth = getCardWidth();
    const gap = 32;
    // Calculate numeric offset for reliability with GSAP
    const centerX = windowWidth / 2;
    const currentCardCenter = (index * cardWidth) + (index * gap) + (cardWidth / 2);
    const xOffset = centerX - currentCardCenter;

    const tl = gsap.timeline({
      overwrite: "auto",
      defaults: { duration: 1, ease: "expo.out" }
    });

    // Move the container
    tl.to(sliderRef.current, { x: xOffset }, 0);

    // Coordinate all cards
    Array.from(cards).forEach((card, i) => {
      const isActive = i === index;
      tl.to(card, {
        scale: isActive ? 1.05 : 1,
        opacity: isActive ? 1 : 0.6,
        duration: 0.8,
        ease: "power2.out"
      }, 0);
    });
  });

  const updateCardStates = (xOffset) => {
    const cards = sliderRef.current.children;
    const cardWidth = getCardWidth();
    const gap = 32;
    const centerX = windowWidth / 2;

    Array.from(cards).forEach((card, i) => {
      const cardCenter = xOffset + (i * cardWidth) + (i * gap) + (cardWidth / 2);
      const distance = Math.abs(centerX - cardCenter);
      const threshold = cardWidth / 2;

      const isActive = distance < threshold;
      const progress = Math.max(0, Math.min(1, 1 - (distance / (cardWidth + gap))));

      gsap.to(card, {
        scale: 1 + (progress * 0.05),
        opacity: 0.6 + (progress * 0.4),
        duration: 0.2,
        overwrite: "auto"
      });
    });
  };

  useGSAP(() => {
    if (!sliderRef.current) return;

    Draggable.create(sliderRef.current, {
      type: "x",
      edgeResistance: 0.65,
      resistance: 0.5,
      bounds: {
        minX: windowWidth / 2 - ((6 * getCardWidth()) + (5 * 32) - (getCardWidth() / 2)),
        maxX: windowWidth / 2 - (getCardWidth() / 2)
      },
      onDrag: function () {
        updateCardStates(this.x);
      },
      onThrowUpdate: function () {
        updateCardStates(this.x);
      },
      snap: function (value) {
        const cardWidth = getCardWidth();
        const gap = 32;
        const index = Math.round((windowWidth / 2 - value - cardWidth / 2) / (cardWidth + gap));
        const safeIndex = Math.max(0, Math.min(5, index));
        setFocusedIndex(safeIndex);
        return windowWidth / 2 - (safeIndex * (cardWidth + gap) + cardWidth / 2);
      },
      inertia: true
    });
  }, { dependencies: [windowWidth], scope: sliderRef });

  const handleCardClick = (index) => {
    setFocusedIndex(index);
    slideToCenter(index);
  };

  // Ensure center on window resize
  useGSAP(() => {
    slideToCenter(focusedIndex);
  }, { dependencies: [windowWidth, focusedIndex], scope: sliderRef });

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-slate-100 relative overflow-hidden transition-colors">

        {/* Hero Section */}
        <div className="w-full flex flex-col justify-around items-center bg-white dark:bg-[#080809] transition-colors">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10 pl-5 xl:pl-0 w-80 xl:w-2/5 pt-70 pb-20"
          >
            <h1 className="text-4xl text-gray-900 w-full dark:text-white md:text-3xl xl:text-6xl font-bold mb-4">Real-Time Chat, <span className="text-gray-900 dark:text-white">Build to Connect</span></h1>
            <p className="text-[#757474] dark:text-slate-300 mb-5 xl:text-lg ">Connect instantly with your friends in a sleek, secure and real-time chat experience.</p>
            <motion.button
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="backdrop-blur-lg cursor-pointer bg-[#1681E3] border border-white/30 shadow-xl text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0f66b8]"
            >
              Get Started
            </motion.button>
          </motion.div>

          <div
            ref={gsapref}
            className="relative w-[100%] mt-20 h-50 sm:h-110 md:h-130 lg:h-160 xl:h-180 lg:mx-20 xl:mx-43"
          >
            <img src={theme === "dark" ? darshboard_image_dark : darshboard_image_light} alt="" className="absolute rounded-2xl px-5 sm:px-0 w-full h-full xl:w-[88%] xl:left-23" />
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-white dark:bg-[#080809] pt-48 pb-32 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-42 transition-colors overflow-hidden">

          <div className="flex flex-col lg:flex-row justify-between items-start mb-24">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white max-w-4xl leading-[0.85]"
            >
              Feature <br /> <span className="text-gray-400 dark:text-neutral-600">Highlights</span>
            </motion.h2>
          </div>

          <div className="relative mt-20">
            <div
              ref={sliderRef}
              className="flex gap-8 pb-10"
              style={{ willChange: "transform" }}
            >
              {[
                { icon: <MessageCircle />, title: "Real-Time Chat", desc: "Blazing fast messaging powered by Socket.io for instant connection." },
                { icon: <LockKeyhole />, title: "Dual Authentication", desc: "Secure login with Google OAuth or traditional email/password." },
                { icon: <UserPlus />, title: "Friend System", desc: "Build your network by searching users and managing requests." },
                { icon: <ImagePlus />, title: "Media Sharing", desc: "Share images and files directly in chat with Cloudinary." },
                { icon: <Activity />, title: "Online Presence", desc: "Stay informed with real-time status indicators in chat." },
                { icon: <UserCog />, title: "Profile Control", desc: "Personalize your chat experience with customizable avatars." }
              ].map((f, i) => (
                <FeatureCard
                  key={i}
                  icon={f.icon}
                  title={f.title}
                  desc={f.desc}
                  isActive={focusedIndex === i}
                  onClick={() => handleCardClick(i)}
                />
              ))}
            </div>
          </div>
        </div>



        <div className="relative w-full h-130 flex items-center justify-center bg-white dark:bg-[#080809]">
          <div
            className="absolute h-90 w-[80%] rounded-3xl flex flex-col items-center justify-center gap-5 text-black dark:text-white bg-[#F1F4F5]/20 dark:bg-[#0f1115]/40 backdrop-blur-xl bg-[radial-gradient(#000000_0.85px,transparent_0.85px),radial-gradient(#000000_0.85px,#ffffff_0.85px)] dark:bg-[radial-gradient(#ffffff_0.6px,transparent_0.6px),radial-gradient(#ffffff_0.6px,#080809_0.6px)] bg-[length:34px_34px] bg-[position:0_0,17px_17px]"
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
              className="cursor-pointer px-6 py-3 rounded-full font-semibold text-white bg-black/90 dark:bg-white/90 dark:text-black border border-white/30 dark:border-black/20 backdrop-blur-lg shadow-xl"
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



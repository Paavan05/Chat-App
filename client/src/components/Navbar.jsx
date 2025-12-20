import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY + 10) {
        setHidden(true); // scrolling down
      } else if (currentY < lastScrollY - 10) {
        setHidden(false); // scrolling up
      }
      setLastScrollY(currentY);
    };

    const handleResize = () => {
      // keep navbar visible after resize jumps
      setHidden(false);
      setLastScrollY(window.scrollY || 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 z-40 w-full flex items-center justify-between
      px-4 sm:px-6 md:px-8 lg:px-20 xl:px-43 py-4 
      bg-white border-b border-slate-200 shadow-md text-slate-900
      dark:bg-[#080809] dark:border-slate-800 dark:text-slate-100
      transform transition-[colors,transform] duration-300 ${hidden ? "-transla te-y-full" : "translate-y-0"}`}
    >

      {/* Logo */}
      <div className=" font-bold text-2xl tracking-wide">
        FlowTalk
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center space-x-4 md:space-x-6 text-gray-700 ">
        <NavLink
          to="/"
          className="hover:text-gray-900 dark:hover:text-white dark:text-white transition"
        >
          Home
        </NavLink>
        <NavLink
          to="/feature"
          className="hover:text-gray-900 dark:hover:text-white dark:text-white transition"
        >
          Features
        </NavLink>
        <NavLink
          to="/about"
          className="hover:text-gray-900 dark:hover:text-white dark:text-white transition"
        >
          About
        </NavLink>

        {/* theme toggle button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:text-white text-black px-2 py-2 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <>
              <Sun size={18} />
              Light
            </>
          ) : (
            <>
              <Moon size={18} />
              Dark
            </>
          )}
        </button>

        <NavLink
          to="/login"
          className="px-4 py-1.5 border border-gray-900/40 dark:border-blue-400/60 rounded-lg
            hover:bg-[#3599FF] text-white bg-[#1681E3] transition"
        >
          Login
        </NavLink>
      </div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden text-black dark:text-white"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 h-screen sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Glassmorphism Mobile Menu */}
      {open && (
        <div
          className="fixed left-1/2 top-[72px] z-50 w-[92%] max-w-xs
            -translate-x-1/2 rounded-2xl border border-white/20
            bg-white dark:bg-[#080809] backdrop-blur-xl shadow-xl p-5 sm:hidden text-slate-900 dark:text-slate-100"
        >
          <div className="flex flex-col gap-4 text-center text-lg">

            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/feature" onClick={() => setOpen(false)}>Features</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <button
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>

            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-1 bg-[#1681E3] text-white py-2 rounded-xl font-semibold shadow transition hover:bg-[#0f66b8]"
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

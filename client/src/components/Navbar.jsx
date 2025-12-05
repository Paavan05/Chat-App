import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-40 w-full flex items-center justify-between
      px-4 sm:px-6 md:px-8 lg:px-20 xl:px-43 py-4
      bg-[#3E3256] border-b border-white/20 shadow-md">

      {/* Logo */}
      <div className="text-white font-bold text-2xl tracking-wide">
        QuickChat
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center space-x-8 text-gray-200">
        <NavLink to="/" className="hover:text-white transition">Home</NavLink>
        <NavLink to="/feature" className="hover:text-white transition">Features</NavLink>
        <NavLink to="/about" className="hover:text-white transition">About</NavLink>

        <NavLink
          to="/login"
          className="px-4 py-1.5 border border-white/40 rounded-lg
            hover:bg-white hover:text-[#3E3256] transition"
        >
          Login
        </NavLink>
      </div>

      {/* Mobile hamburger */}
      <button className="sm:hidden text-white" onClick={() => setOpen(!open)}>
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Glassmorphism Mobile Menu */}
      {open && (
        <div
          className="fixed left-1/2 top-[72px] z-50 w-[92%] max-w-xs
            -translate-x-1/2 rounded-2xl border border-white/20
            bg-white/10 backdrop-blur-xl shadow-xl p-5 sm:hidden"
        >
          <div className="flex flex-col gap-4 text-center text-white text-lg">
            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/feature" onClick={() => setOpen(false)}>Features</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>

            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-1 bg-white text-[#3E3256] py-2 rounded-xl font-semibold shadow transition"
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

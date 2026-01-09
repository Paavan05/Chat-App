import React from "react";
import { Link } from "react-router-dom";
import { Zap, Phone, Earth } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-white dark:bg-[#090909] pt-16 pb-10 sm:pb-8 h-[80vh] px-4 sm:px-6 md:px-1 lg:px-20 xl:px-42 relative overflow-hidden transition-colors">

            {/* Main Container */}
            <div className="relative z-10 flex flex-wrap gap-10 text-gray-900 dark:text-slate-200">

                {/* Brand Section */}
                <div className="flex-1 min-w-[200px]">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide mb-3">
                        FlowTalk
                    </h2>
                    <p className="text-gray-700 dark:text-slate-300">
                        © {new Date().getFullYear()} FlowTalk — All Rights Reserved.
                    </p>
                </div>

                {/* Links + Highlights */}
                <div className="flex flex-col sm:flex-row gap-5">

                    {/* Quick Links */}
                    <div className="flex-1 min-w-[150px]">
                        <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-3">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><Link to="/feature" className="hover:underline">Features</Link></li>
                            <li><Link to="/about" className="hover:underline">About</Link></li>
                            <li><Link to="/login" className="hover:underline">Login</Link></li>
                        </ul>
                    </div>

                    {/* Chat Highlights */}
                    <div className="flex-1 min-w-[300px]">
                        <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-3">
                            Why FlowTalk?
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-orange-500" />
                                Fast Real-Time Messaging
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-500" />
                                Clean & Modern Interface
                            </li>
                            <li className="flex items-center gap-2">
                                <Earth className="w-4 h-4 text-green-500" />
                                24/7 Server Availability
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            {/* Large filled background word at bottom-center (decorative) */}
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-16">
                <svg className="w-full h-40 md:h-56" viewBox="0 0 1200 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <text x="50%" y="85%" textAnchor="middle" fill="currentColor" className="text-black/6 dark:text-white/6" style={{fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', fontWeight: 800}} fontSize="180">
                        FlowTalk
                    </text>
                </svg>
            </div>

        </footer>
    );
};

export default Footer;

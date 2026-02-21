import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock3, Sparkles, ArrowRight, Globe, Zap, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from "../../context/ThemeContext";


const About = () => {
  const { theme } = useContext(ThemeContext);

  const teamMembers = [
    {
      id: 1,
      name: "Krish Limbani",
      role: "Frontend Developer",
      initials: "KL",
      gradient: "from-blue-400 to-blue-600",
      github: "https://github.com/KrishLimbani",
      email: "krishlimbani01@gmail.com",
    },
    {
      id: 2,
      name: "Paavan Dhameliya",
      role: "UI/UX Designer",
      initials: "SD",
      gradient: "from-purple-400 to-purple-600",
      github: "https://github.com/Paavan05",
      email: "paavanhn13@gmail.com",
    },
    
  ];

  return (
    <>
    <Navbar/>
    <div>
      <section className="pb-16 pt-60 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#080809]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">FlowTalk</h1>
          <p className="text-xl text-gray-900 dark:text-slate-100  mb-8 leading-relaxed">A modern, real-time chat application built with the MERN stack and WebSocket technology. Connect with friends and team members with instant messaging, user profiles, and seamless authentication.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-3 bg-[#1681E3] text-white rounded-lg hover:bg-blue-700 transition font-semibold">Start chatting</button>
            <button className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition font-semibold">Back to Home</button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#080809]">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-left">About this Project</h2>
           <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">What is FlowTalk?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">FlowTalk is a full-featured real-time messaging platform that combines modern web technologies to deliver fast, responsive, and reliable chat functionality. Whether you're connecting with close friends or collaborating with team members, FlowTalk provides a clean, intuitive interface for seamless communication.</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Built with a focus on performance and user experience, our application leverages cutting-edge technologies to ensure your messages arrive instantly and your interactions are smooth across all devices.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Key Highlights</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className='flex items-start'>
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1"></span>
                  <span>
                    <strong>Real-time Messaging:</strong>
                     Instant message delivery using WebSocket technology
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className="text-blue-600 mr-3 mt-1"></span>
                  <span>
                    <strong>OAuth Authentication:</strong>
                     Secure login with OAuth integration
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1"></span>
                  <span>
                    <strong>User Profiles:</strong>
                     Customizable profiles with avatars and status
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1"></span>
                  <span>
                    <strong>Responsive Design:</strong>
                     Works seamlessly across all device sizes
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-blue-600 mr-3 mt-1'></span>
                  <span>
                    <strong>Friend System: </strong>
                     Add friends and manage your contact list
                  </span>
                </li>
              </ul>
            </div>
           </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#080809]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-left">Technology Stack</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Frontend Card */}
            <div className="bg-slate-900 dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
                <Globe size={24} className="text-blue-400"/>
                Frontend
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• <strong>React</strong> - UI library</li>
                <li>• <strong>Vite</strong> - Build tool</li>
                <li>• <strong>Tailwind CSS</strong> - Styling</li>
                <li>• <strong>React Router</strong> - Navigation</li>
                <li>• <strong>Context API</strong> - State management</li>
                <li>• <strong>Lucide Icons</strong> - Icon library</li>
              </ul>
            </div>

            {/* Backend Card */}
            <div className="bg-slate-900 dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
                <Zap size={24} className="text-blue-400"/>
                Backend
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• <strong>Node.js</strong> - Runtime</li>
                <li>• <strong>Express.js</strong> - Web framework</li>
                <li>• <strong>MongoDB</strong> - Database</li>
                <li>• <strong>Mongoose</strong> - ODM</li>
                <li>• <strong>WebSocket</strong> - Real-time communication</li>
                <li>• <strong>OAuth 2.0</strong> - Authentication</li>
              </ul>
            </div>

            {/* Additional Tools Card */}
            <div className="bg-slate-900 dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
                <Clock3 size={24} className="text-blue-400"/>
                Additional Tools
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• <strong>Cloudinary</strong> - Image storage</li>
                <li>• <strong>Arctic</strong> - OAuth provider</li>
                <li>• <strong>JWT</strong> - Token authentication</li>
                <li>• <strong>Vercel</strong> - Deployment</li>
                <li>• <strong>ESLint</strong> - Code quality</li>
                <li>• <strong>Git</strong> - Version control</li>
              </ul>
            </div>
          </div>
        </div>  
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#080809]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-12 text-left">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Real-time Communication */}
            <div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Real-time Communication</h3>
              <p className="dark:text-slate-300 text-black mb-4 leading-relaxed">
                Chat-App uses <strong className="text-blue-400">WebSocket technology</strong> to establish persistent, bidirectional communication channels between clients and the server. This allows messages to be transmitted instantly without the need for constant polling.
              </p>
              <p className="dark:text-slate-300 text-black leading-relaxed">
                When you send a message, it's immediately transmitted to the server, validated, stored in our MongoDB database, and pushed to all relevant recipients in real-time.
              </p>
            </div>

            {/* Secure Authentication */}
            <div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Secure Authentication</h3>
              <p className="dark:text-slate-300 text-black mb-4 leading-relaxed">
                We integrate <strong className="text-blue-400">OAuth 2.0</strong> context to provide secure, modern authentication. Users can sign in using their existing accounts from trusted providers, eliminating the need to manage additional passwords.
              </p>
              <p className="dark:text-slate-300 text-black leading-relaxed">
                <strong className="text-blue-400">JWT tokens</strong> are used for session management, ensuring that sensitive operations are protected and user data remains secure throughout their session.
              </p>
            </div>

            {/* State Management */}
            <div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">State Management</h3>
              <p className="dark:text-slate-300 text-black mb-4 leading-relaxed">
                Our application uses <strong className="text-blue-400">React Context API</strong> to manage global state efficiently. This includes user authentication state, theme preferences, and chat data.
              </p>
              <p className="dark:text-slate-300 text-black leading-relaxed">
                Each context (AuthContext, ChatContext, ThemeContext) handles a specific domain, keeping the application organized and maintainable.
              </p>
            </div>

            {/* Data Persistence */}
            <div>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Data Persistence</h3>
              <p className="dark:text-slate-300 text-black mb-4 leading-relaxed">
                All messages, user profiles, and relationships are stored in <strong className="text-blue-400">MongoDB</strong>, a flexible NoSQL database that scales with your needs.
              </p>
              <p className="dark:text-slate-300 text-black leading-relaxed">
                User avatars and media files are securely stored on <strong className="text-blue-400">Cloudinary</strong>, ensuring fast delivery and reliable access from anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#080809]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-left">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}/>
                
                {/* Content */}
                <div className="relative p-8 text-center">
                  {/* Avatar with Glow */}
                  <div className="mb-6 relative">
                    <div className={`absolute inset-0 ${member.gradient} rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-all duration-300 scale-125`}/>
                    <div className={`relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-4xl font-bold">{member.initials}</span>
                    </div>
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-6 uppercase tracking-widest">{member.role}</p>

                  {/* Divider */}
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 rounded-full group-hover:w-16 transition-all duration-300"/>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-300 font-semibold text-sm" title="GitHub">
                      <Github size={16}/>
                      GitHub
                    </a>
                    <a href={`mailto:${member.email}`} target='_blank' className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg" title="Email">
                      <Mail size={16}/>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8  ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black dark:text-slate-100 mb-6">Check Out Our Repository</h2>
          <p className="text-xl text-black dark:text-slate-100 mb-8">Explore the source code and contribute to FlowTalk on GitHub</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/Paavan05/Chat-App" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3   border-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
              <Github size={20} className="mr-2"/>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      
    </div>
    <Footer/>
    </>
  );
};

export default About;
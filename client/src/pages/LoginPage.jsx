import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContex'
import GoogleLoginButton from '../components/GoogleLoginButton'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(currState == "Sign up" && !isDataSubmitted){
      setIsDataSubmitted(true);
      return;
    }
  
    login(currState === "Sign up" ? "signup" : "login", { fullName, email, password, bio});
  }

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 bg-cover bg-center flex items-center
     justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl text-slate-900 dark:text-slate-100 transition-colors  '>
      {/* ----------- left ---------- */}
      <img src={assets.logo_big} alt="" className='w-[150px] sm:w-[200px] md:w-[315px]' />
      {/* ----------- right ---------- */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-gray-200 dark:border-slate-700 p-6 flex flex-col
        gap-6 rounded-lg shadow-lg transition-colors'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className=' w-5 cursor-pointer' />
          }
        </h2>
        {currState === "Sign up" && !isDataSubmitted && (
          <input onChange={(e) => setFullName(e.target.value)} value={fullName}
            type="text" className='p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md 
           focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Full Name' required />
        )}

        {!isDataSubmitted && (
          <>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
              type="email" placeholder='Email Address' required className='p-2
             border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md focus:outline-none focus:ring-2
             focus:ring-indigo-500'/>

            <div className="relative w-full">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                className="w-full p-2 pr-10 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <img
                src={showPassword ? assets.show_password : assets.hide_password}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity"
                alt={showPassword ? "Hide password" : "Show password"}
              />
            </div>
          </>
        )}
        {
          currState === "Sign up" && isDataSubmitted && (
            <textarea onChange={(e) => setBio(e.target.value)} value={bio}
              rows={4} className='p-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Provide a short bio...' required></textarea>
          )
        }

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400
         to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <GoogleLoginButton />

        {/* <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div> */}

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600 dark:text-slate-300'>Already have an account? <span
              onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}
              className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-600 dark:text-slate-300'>Create and account <span
              onClick={() => { setCurrState("Sign up") }}
              className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
          )}
        </div>
      </form >

    </div >
  )
}

export default LoginPage

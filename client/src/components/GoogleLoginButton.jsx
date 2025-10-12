import React from "react";
import googleLogo from '/Google-2025-G-logo.png'

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`; 
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="py-2 px-4 rounded bg-[#F8F8F8] text-[#1d1d1f] flex justify-center items-center gap-2"
    >
      <img src={googleLogo} alt="" className="h-8"/>
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;

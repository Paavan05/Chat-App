import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`; // simply redirect browser to backend endpoint that starts OAuth flow
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="py-2 px-4 rounded bg-red-500 text-white"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;

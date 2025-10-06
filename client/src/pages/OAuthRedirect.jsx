import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Logged in via Google!");
          navigate("/dashboard");
        } else {
          toast.error("Failed to verify session");
          navigate("/login");
        }
      });
  }, []);

  return <div className='text-center mt-20 text-xl'>Logging you in...</div>;
};

export default OAuthRedirect;

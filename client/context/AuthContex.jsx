import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // for cookie auth

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // check if user is authenticated and if so, set the user data and connect the socket & Initialize auth on first load
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check", {
        withCredentials: true, // send cookies
      });

      if (data.success) {
        // Backend returns either user data or userId
        if (data.user) setAuthUser(data.user);
        else if (data.userId) setAuthUser({ _id: data.userId });

        connectSocket(data.user || { _id: data.userId });
      } else {
        setAuthUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Check auth error:", error.response?.data || error.message);
      toast.error(error.message);
      setAuthUser(null);
      localStorage.removeItem("token");
    }
  };

  //Login function to handle user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data.success) {
        setAuthUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);

        axios.defaults.headers.common["token"] = data.token;

        connectSocket(data.user);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //LogOut function to handle user logout and socket disconnection
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setToken(null);
      setAuthUser(null);
      setOnlineUsers([]);

      delete axios.defaults.headers.common["token"];

      if (socket) socket.disconnect();

      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // update profile function to handle user profile updates
  const updateProfile = async (body) => {
     try {
      const { data } = await axios.put("/api/auth/update-profile", body, {
        withCredentials: true,
      });

      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // Connect socket function to handle socket connection and online users updates
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    newSocket.on("disconnect", () => {
      setOnlineUsers([]);
    });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

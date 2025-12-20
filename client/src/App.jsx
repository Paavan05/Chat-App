import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContex";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import OAuthRedirect from "./pages/OAuthRedirect";
import Feature from "./pages/Feature";
import About from "./pages/About";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div className='min-h-screen bg-[#F7F8FC] bg-cover text-gray-900 dark:text-slate-100 dark:bg-[#080809] dark:bg-none transition-colors'>
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/dashboard'
          element={authUser ? <Dashboard /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to='/dashboard' />}
        />
        <Route
          path='/profile'
          element={authUser ? <ProfilePage /> : <Navigate to='/login' />}
        />
        <Route path='/oauth-redirect' element={<OAuthRedirect />} />
        <Route path="/feature" element={<Feature/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  );
};

export default App;

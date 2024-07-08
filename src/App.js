import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import NavbarHook from "./NavbarHook/NavbarHook";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import GetStarted from "./pages/GetStarted";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named export

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken); // Log decoded token to inspect its contents
            const userRole = decodedToken.role;
            setUserRole(userRole);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            {isLoggedIn ? <NavbarHook setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} /> : <Navbar />}
            
            <div className="separator"></div>
           <div className="">
                <Routes>
                    {userRole === 'admin' && (
                        <Route path="/" element={<AdminDashboard />} />
                    )}
                    {userRole !== 'admin' && (
                        <Route path="/" element={<UserProfile />} />
                    )}
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/logout" element={<SignOut />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/get-started" element={<GetStarted />} />
                    <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home for unknown routes */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

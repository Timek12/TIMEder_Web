// src/App.js
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Login from './components/Login/Login.js';
import Footer from "./components/Footer/Footer";
import Notifications from "./components/Notifications/Notifications";
import AccountManagement from "./components/AccountManagement/AccountManagement";
import ErrorManagement from "./components/ErrorManagement/ErrorManagement";
import EventManagement from "./components/EventManagement/EventManagement";
import './App.css';
import GroupManagement from "./components/GroupManagement/GroupManagement"; // Import the CSS file
import ResetPassword from "./components/ResetPassword/ResetPassword";
import EmailConfirmation from "./components/EmailConfirmation/EmailConfirmation";

function MainContent() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const location = useLocation();

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    const handleReset = () => {
        console.log("Password reset");
    }


    return (
        <div className="App">
            {isLoggedIn && location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/reset" && location.pathname !== "/email-confirmation" && <Header onLogout={handleLogout} />}
            <div className='content'>
                <Routes>
                    <Route path="/account-management" element= { <AccountManagement /> } > </Route>
                    <Route path="/group-management" element={ <GroupManagement /> }> </Route>
                    <Route path="/event-management" element={ <EventManagement /> }> </Route>
                    <Route path="/notifications" element= { <Notifications/> } > </Route>
                    <Route path="/error-reports" element={ <ErrorManagement />}> </Route>
                    <Route path="/login" element={ <Login onLogin={handleLogin} onLogout={handleLogout} />}> </Route>
                    <Route path="/reset" element={ <ResetPassword onReset={handleReset} onLogin={handleLogin} onLogout={handleLogout} />}> </Route>
                    <Route path="/email-confirmation" element={ <EmailConfirmation onConfirm={handleReset} />}> </Route>
                    <Route path="*" element={<Login onLogin={handleLogin} />}> </Route>
                </Routes>
            </div>
            {isLoggedIn && location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/reset" && location.pathname !== "/email-confirmation" && <Footer />}
        </div>
    );
}

function App() {
    return (
        <Router>
            <MainContent />
        </Router>
    );
}

export default App;
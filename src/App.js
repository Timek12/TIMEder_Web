// src/App.js
import React, { useState } from 'react';
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

function MainContent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="App">
            {location.pathname !== "/login" && <Header onLogout={handleLogout} />}
            <div className='content'>
                <Routes>
                    <Route path="/account-management" element= { <AccountManagement /> } > </Route>
                    <Route path="/group-management" element={ <GroupManagement /> }> </Route>
                    <Route path="/event-management" element={ <EventManagement /> }> </Route>
                    <Route path="/notifications" element= { <Notifications/> } > </Route>
                    <Route path="/error-reports" element={ <ErrorManagement />}> </Route>
                    <Route path="/login" element={ <Login onLogin={handleLogin} />}> </Route>
                    <Route path="/"  element = { <AccountManagement />}> </Route>
                </Routes>
            </div>
            {location.pathname !== "/login" && <Footer />}
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
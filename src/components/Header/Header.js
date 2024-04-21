// src/components/Header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file
import logo from '../../images/logo.png'; // Import the logo image

function Header( {onLogout} ) {
    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={logo} alt="Logo" />
            </Link>
            <nav>
                <Link to="/account-management"><i className='bi bi-person-circle'> </i> Account Management</Link>
                <Link to="/event-management"><i className='bi bi-calendar-event'></i> Event Management</Link>
                <Link to="/group-management"><i className='bi bi-people-fill'></i> Group
                    Management</Link>
                <Link to="/error-reports"><i className='bi bi-bug'></i> Error Reports</Link>
                <Link to="/notifications"><i className='bi bi-bell'></i> Notifications</Link>
                <Link to="/login" onClick={onLogout}><i className="bi bi-box-arrow-left"></i> Logout</Link>
            </nav>
        </header>
    );
}

export default Header;
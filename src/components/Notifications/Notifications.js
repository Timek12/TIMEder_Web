// src/components/Notification/Notification.js
import React from 'react';
import './Notifications.css';

function Notification() {
    return (

        <div className="notification-container" style={{height: '500px'}}>
            <h1 className='title'><i className='bi bi-bell'></i> Create Notification
            </h1>
            <div className="card" style={{borderRadius: '50px'}}>
                <div className="input-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" rows="4"></textarea>
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-purple btn-block">Send</button>
                </div>
            </div>

        </div>
    );
}

export default Notification;
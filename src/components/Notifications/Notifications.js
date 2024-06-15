import React, {useState} from 'react';
import './Notifications.css';
import {getNotifications} from "../../services/notificationService";
import {showErrorMessage, showInfoMessage, showSuccessMessage} from "../../services/swalService";

function Notification() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message === '') {
            showInfoMessage('Please enter a message').then(r => r.dismiss);
            return;
        }

        getNotifications(message, new Date())
            .then(() => {
                showSuccessMessage('Notification sent successfully.').then(r => r.dismiss);
                setMessage('');
            })
            .catch(error => {
                showErrorMessage('Failed to send notification.').then(r => r.dismiss);
                setMessage('');
            });
    }

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div className="notification-container" style={{height: '500px'}}>
            <h1 className='title'><i className='bi bi-bell'></i> Create Notification
            </h1>
            <div className="card" style={{borderRadius: '50px'}}>
                <div className="input-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" rows="4" value={message} onChange={handleInputChange}></textarea>
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-purple btn-block" onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Notification;
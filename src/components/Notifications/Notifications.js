// src/components/Notification/Notification.js
import React, {useState} from 'react';
import axios from "axios";
import './Notifications.css';

function Notification() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message === '') {
            alert('Please enter a message');
            return;
        }

        const notificationDTO = {
            content: message,
            dateTime: null
        }

        axios.post('http://localhost:8080/api/v1/notifications/sendToAll', notificationDTO, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + token
            }
        })
            .then(() => {
                alert('Message sent');
                setMessage('');
            })
            .catch(error => {
                alert('An error occurred ' + error.message);
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
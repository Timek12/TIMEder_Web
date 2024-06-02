import React, {useState} from 'react';
import './Notifications.css';
import {getNotifications} from "../../services/notificationService";
import Swal from "sweetalert2";

function Notification() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message === '') {
            alert('Please enter a message');
            return;
        }

        getNotifications(message, new Date())
            .then(() => {
                Swal.fire(
                    'Success!',
                    'Notification sent successfully.',
                    'success'
                )
                setMessage('');
            })
            .catch(error => {
                Swal.fire(
                    'Error',
                    'Error while sending notification: ' + error.message,
                    'error'
                )
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
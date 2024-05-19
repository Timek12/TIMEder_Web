import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Import the CSS file
import logo from '../../images/logo.png'; // Import the logo image
import Login from "../Login/Login";

function ResetPassword({ onReset, onLogin, onLogout }) {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        setSubmitClicked(true);
        onReset(newPassword);
        onLogout(); // Add this line
        navigate("/login");
    };

    if (submitClicked) {
        return <Login onLogin={onLogin} />;
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center login-container">
            <div>
                <img style={{paddingLeft: '25px'}} src={logo} alt="Logo"/>
                <h1 className="text-center" style={{color: 'var(--black-purple)'}}> Timeder</h1>
            </div>
            <div className="card" style={{width: '30rem', height: '30rem', borderRadius: '50px'}}>
                <div className="card-body">
                    <div className="icon-container">
                        <i className='bi bi-person-circle icon'></i>
                    </div>
                    <h3 className="text-center">Reset Password</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group input-icon">
                            <i className="fas fa-lock"></i>
                            <input type="password" className="form-control" id="inputNewPassword" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <div className="form-group input-icon">
                            <i className="fas fa-lock"></i>
                            <input type="password" className="form-control" id="inputConfirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-purple btn-block">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
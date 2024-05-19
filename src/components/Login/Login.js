import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file
import logo from '../../images/logo.png';
import ResetPassword from "../ResetPassword/ResetPassword"; // Import the logo image
import EmailConfirmation from "../EmailConfirmation/EmailConfirmation";

function Login({ onLogin, onLogout }) {
    const navigate = useNavigate();
    const [resetClicked, setResetClicked] = useState(false);
    const [resetEmail, setResetEmail] = useState(false);

    useEffect(() => {
        if (onLogin) {
            onLogin();
        }
    }, [onLogin]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin();
        navigate("/");
    };

    const handleEmailConfirm = () => {
        setResetEmail(false);
        setResetClicked(true);
    }


    const handleResetPassword = () => {
        setResetEmail(true);
        onLogout();
        navigate("/email-confirmation");
    }

    if(resetEmail) {
        return <EmailConfirmation onConfirm={handleEmailConfirm} />;
    }

    if (resetClicked) {
        return <ResetPassword onReset={() => {}} />;
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center login-container">
            <div>
                <img style={{paddingLeft: '25px'}} src={logo} alt="Logo"/>
                <h1 className="text-center" style={{color: 'var(--black-purple)'}}> Timeder</h1>
            </div>
            <div className="card" style={{width: '30rem', height: '30rem', borderRadius: '50px'}}>                <div className="card-body">
                    <div className="icon-container">
                        <i className='bi bi-person-circle icon'></i>
                    </div>
                    <h3 className="text-center">Sign in</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group input-icon">
                            <i className="fas fa-envelope"></i>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                        </div>
                        <div className="form-group input-icon">
                            <i className="fas fa-lock"></i>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-purple btn-block">Sign in</button>
                        </div>
                        <div className="form-group text-right">
                            <button type="button" className="btn btn-link btn-sm" onClick={handleResetPassword}>Forgot Password?</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
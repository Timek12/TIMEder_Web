import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../images/logo.png";

function EmailConfirmation({ onConfirm }) {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        onConfirm();
        navigate("/reset");
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center login-container">
            <div>
                <img style={{paddingLeft: '25px'}} src={logo} alt="Logo"/>
                <h1 className="text-center" style={{color: 'var(--black-purple)'}}> Timeder</h1>
            </div>
            <div className="card" style={{width: '30rem', height: '25rem', borderRadius: '50px'}}>
                <div className="card-body">
                    <div className="icon-container">
                        <i className='bi bi-envelope icon'></i>
                    </div>
                    <h3 className="text-center">Confirmation email</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group input-icon">
                        <input type="email" className="form-control" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-purple btn-block">Send email</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmailConfirmation;
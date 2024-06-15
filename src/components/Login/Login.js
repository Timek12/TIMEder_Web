import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.png';
import ResetPassword from "../ResetPassword/ResetPassword";
import EmailConfirmation from "../EmailConfirmation/EmailConfirmation";
import Swal from "sweetalert2";
import authService from "../../services/authService";

function Login({onLogin, onLogout}) {
    const navigate = useNavigate();
    const [resetClicked, setResetClicked] = useState(false);
    const [resetEmail, setResetEmail] = useState(false);
    const [index, setIndex] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (onLogin) {
            onLogin();
        }
    }, [onLogin]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = authService.login(index, password);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                await Swal.fire(
                    'Success!',
                    'You have successfully logged in.',
                    'success'
                )
                onLogin();
                navigate("/account-management"); // Navigate to the account page after logging in
            } else {
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            await Swal.fire(
                'Error!',
                'Connection to database failed. Error: ' + error.message,
                'error'
            )
            console.error('Error:', error);
        }
    };

    const handleIndexChange = (event) => {
        setIndex(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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

    if (resetEmail) {
        return <EmailConfirmation onConfirm={handleEmailConfirm}/>;
    }

    if (resetClicked) {
        return <ResetPassword onReset={() => {
        }}/>;
    }

    return (<div className="d-flex flex-column justify-content-center align-items-center login-container">
        <div>
            <img style={{paddingLeft: '25px'}} src={logo} alt="Logo"/>
            <h1 className="text-center" style={{color: 'var(--black-purple)'}}> Timeder</h1>
        </div>
        <div className="card" style={{width: '30rem', height: '30rem', borderRadius: '50px'}}>
            <div className="card-body">
                <div className="icon-container">
                    <i className='bi bi-person-circle icon'></i>
                </div>
                <h3 className="text-center">Sign in</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group input-icon">
                        <i className="fas fa-envelope"></i>
                        <input
                            required={true}
                            className="form-control"
                            id="inputIndex"
                            placeholder="Index"
                            value={index}
                            onChange={handleIndexChange}
                        />
                    </div>
                    <div className="form-group input-icon">
                        <i className="fas fa-lock"></i>
                        <input
                            required={true}
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-purple btn-block">Sign in</button>
                    </div>
                    <div className="form-group text-right">
                        <button type="button" className="btn btn-link btn-sm" onClick={handleResetPassword}>Forgot
                            Password?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

export default Login;
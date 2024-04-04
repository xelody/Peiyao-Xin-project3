import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import Nav from './Nav';
import Modal from './Modal';
import '../styles/common.css';
import '../styles/inputs.css';

export default function CreateUser() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn, activeUsername, setActiveUsername } = useContext(AuthContext);
    const navigate = useNavigate();

    function setUsername(event) {
        const username = event.target.value;
        setUsernameInput(username);
    }

    function setPassword(event) {
        const pswd = event.target.value;
        setPasswordInput(pswd);
    }

    function setConfirmPassword(event) {
        const confirmPassword = event.target.value;
        setConfirmPasswordInput(confirmPassword);
    }

    async function submit() {
        try {
            if (passwordInput !== confirmPasswordInput) {
                setError("Passwords do not match");
                setIsErrorModalOpen(true);
                return;
            }

            const response = await axios.post('/api/users/register', {username: usernameInput, password: passwordInput});
            setActiveUsername(usernameInput);
            navigate(`/password/${activeUsername}`);
        } catch (error) {
            console.log(error);
            setError(error.response.data);
            setIsErrorModalOpen(true);
        }
    }

    function closeErrorModal() {
        setIsErrorModalOpen(false);
    }

    return (
        <div>
            <Nav />
            <div className='title'>
                <h1>Create New Account</h1>
            </div>
            <Modal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error} />
            <div className='input-fields create-account-margin'>
                <div className='input-container'>
                    <div>
                        <span>Username: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type='text' value={usernameInput} onInput={setUsername}></input>
                    </div>
                    <div>
                        <span>Password: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type='password' value={passwordInput} onInput={setPassword}></input>
                    </div>
                    <div>
                        <span>Confirm Password: &nbsp;</span>
                        <input type='password' value={confirmPasswordInput} onInput={setConfirmPassword}></input>
                    </div>
                </div>
                <button onClick={submit}>Create Account</button>
            </div>
        </div>
    );
}

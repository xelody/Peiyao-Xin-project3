import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Nav from './Nav'
import Modal from './Modal';
import '../styles/common.css';
import '../styles/inputs.css';

export default function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [error, setError] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const navigate = useNavigate();

    const isHomeActive = false;
    const isLogInActive = true;
    const isPasswordActive = false;

    function setUsername(event) {
        const username = event.target.value;
        setUsernameInput(username);
    }

    function setPassword(event) {
        const pswd = event.target.value;
        setPasswordInput(pswd);
    }

    async function submit() {
        try {
            const response = await axios.post('/api/users/login', {username: usernameInput, password: passwordInput})
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error.response.data);
            setIsErrorModalOpen(true);
        }

        // console.log(usernameInput, passwordInput);
    }

    function closeErrorModal() {
        setIsErrorModalOpen(false);
    }

    function registerPage() {
        navigate('/register');
    }

    return (
        <div>
            <Nav isHomeActive={isHomeActive}
                isLogInActive={isLogInActive}
                isPasswordActive={isPasswordActive} />
            <Modal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error} />
            <div className='input-fields'>
                <div>
                    <span>Username: </span><input type='text' value={usernameInput} onInput={setUsername}></input>
                </div>
                <div>
                    <span>Password: </span><input type='password' value={passwordInput} onInput={setPassword}></input>
                </div>
                <div>
                    <button onClick={submit}>Login</button>
                    <button onClick={registerPage}>Sign up</button>
                </div>
            </div>
        </div>
    )


}
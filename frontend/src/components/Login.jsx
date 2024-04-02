import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Nav from './Nav'
import '../styles/common.css';
import '../styles/inputs.css';

export default function Login() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [error, setErrorValue] = useState('');
    const navigate = useNavigate();

    function setUsername(event) {
        const username = event.target.value;
        setUsernameInput(username);
    }

    function setPassword(event) {
        const pswd = event.target.value;
        setPasswordInput(pswd);
    }

    async function submit() {
        setErrorValue('');
        try {
            const response = await axios.post('/api/users/login', {username: usernameInput, password: passwordInput})
            navigate('/');
        } catch (e) {
            setErrorValue(e.response.data)
        }

        // console.log(usernameInput, passwordInput);
    }

    function registerPage() {
        navigate('/register');
    }

    return (
        <div>
            <Nav />
            {!!error && <h2>{error}</h2>}
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
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Nav from './Nav'
import '../styles/common.css';
import '../styles/inputs.css';

export default function CreateUser() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('')
    const [error, setError] = useState('');

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
        try {
            const response = await axios.post('/api/users/register', {username: usernameInput, password: passwordInput})
            navigate('/')
        } catch (error) {
            console.log(error)
            setError(error.response.data)
        }
        // console.log(usernameInput, passwordInput);
    }

    return (
        <div>
            <Nav />
            <div className='title'>
                <h1>Create New Account</h1>
            </div>
            {!!error && <h3>{error}</h3>}
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
                            <input type='text' value={passwordInput} onInput={setPassword}></input>
                    </div>
                    <div>
                        <span>Confirm Password: &nbsp;</span>
                        <input type='text' value={passwordInput} onInput={setPassword}></input>
                    </div>
                </div>

                <button onClick={submit}>Create Account</button>
            </div>
        </div>
    )


}
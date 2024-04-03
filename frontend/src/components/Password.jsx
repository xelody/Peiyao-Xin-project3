import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';

import Nav from './Nav';
import Header from './Header';
import PasswordInputForm from './PasswordInputForm';
import formatDate from "./FormatDate"
import { AuthContext } from './AuthContext';

import '../styles/common.css';
import '../styles/inputs.css';
import '../styles/password.css';

export default function Password() {

    const { isLoggedIn, setIsLoggedIn, activeUsername } = useContext(AuthContext);
    const [passwords, setPasswords] = useState([]);
    const isHomeActive = false;
    const isLogInActive = false;
    const isPasswordActive = true;

    const handleSubmit = async ({ url, password }) => {
        try {
            const response = await axios.post('/api/password', { activeUsername, url, password });
        } catch (error) {
            console.error('Error storing password:', error);
        }
    };

    useEffect(() => {
        getAllPasswords();
    }, [activeUsername]);

    async function getAllPasswords() {
        try {
            console.log("getAllPasswords called");
            const response = await axios.get(`/api/password/${activeUsername}`);
            setPasswords(response.data);
        } catch (error) {
            console.error('Error fetching Pokemons:', error);
        }
    }

    const passwordRows = passwords.map(password => (
        <tr key={password._id}>
            <td>{password.urlAddress}</td>
            <td>{password.password}</td>
            <td>{formatDate(password.time)}</td>
            <td>{password.username}</td>
            <td>
                <button onClick={() => handleUpdate(password._id)}>Update</button>
                <button onClick={() => handleDelete(password._id)}>Delete</button>
                <button onClick={() => handleShare(password._id)}>Share</button>
            </td>
        </tr>
    ));

    return isLoggedIn ? (
        <div>
            <Nav isHomeActive={isHomeActive}
                isLogInActive={isLogInActive}
                isPasswordActive={isPasswordActive} />
            <PasswordInputForm onSubmit={handleSubmit} />
            <div className='content-box'>
                <table className='password-table'>
                    <thead>
                        <tr>
                            <th>URL Address</th>
                            <th>Password</th>
                            <th>Last Updated</th>
                            <th>Shared By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwordRows}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (<div>
        <Nav isHomeActive={isHomeActive}
            isLogInActive={isLogInActive}
            isPasswordActive={isPasswordActive} />
        <Header />
    </div>)
}
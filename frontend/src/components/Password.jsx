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
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordInputs, setNewPasswordInputs] = useState({});
    const [newShareInputs, setNewShareInputs] = useState({});

    const isHomeActive = false;
    const isLogInActive = false;
    const isPasswordActive = true;

    const handleSubmit = async ({ url, password }) => {
        try {
            const response = await axios.post('/api/password', { activeUsername, url, password });
            await getAllPasswords();
        } catch (error) {
            console.error('Error storing password:', error);
            alert(JSON.stringify(error.response.data));
        }
    };

    const handleUpdate = async (passwordId) => {
        try {
            const response = await axios.put(`/api/password/${passwordId}`, { password: newPasswordInputs[passwordId] });
            console.log('Password updated successfully:', response.data);
            // Refresh passwords list after update
            await getAllPasswords();

            setNewPassword('');
            setNewPasswordInputs(prevState => ({ ...prevState, [passwordId]: '' }));
        } catch (error) {
            console.error('Error updating password:', error);
            alert(JSON.stringify(error.response.data));
        }
    };

    const handleDelete = async (passwordId) => {
        try {
            // Send DELETE request to the server endpoint
            await axios.delete(`/api/password/${passwordId}`);
            console.log('Password deleted successfully');

            await getAllPasswords();
        } catch (error) {
            console.error('Error deleting password:', error);
            alert(JSON.stringify(error.response.data));
        }
    };

    const handleShare = async (passwordId) => {
        const targetUser = newShareInputs[passwordId];
        if (targetUser === activeUsername) {
            alert('Enter an username other than yourself');
            setNewShareInputs(prevState => ({ ...prevState, [passwordId]: '' }));
            return;
        }
        try {
            const response = await axios.post(`/api/password/share/${passwordId}`, { accessUser: newShareInputs[passwordId] });
            setNewShareInputs(prevState => ({ ...prevState, [passwordId]: '' }));
            await getAllPasswords();
        } catch (error) {
            console.error('Error storing password:', error);
            alert(JSON.stringify(error.response.data));
        }
    };


    useEffect(() => {
        getAllPasswords();
    }, [activeUsername]);

    async function getAllPasswords() {
        try {
            const response = await axios.get(`/api/password/${activeUsername}`);
            setPasswords(response.data);
        } catch (error) {
            console.error('Error fetching Passwords:', error);
            alert(JSON.stringify(error.response.data));
        }
    }

    const passwordRows = passwords.map(password => (
        <tr key={password._id}>
            <td>{password.urlAddress}</td>
            <td>{password.password}</td>
            <td>{formatDate(password.time)}</td>
            <td>{password.username !== activeUsername ? password.username : ''}</td>
            {password.username === activeUsername ? (
                <>
                    <td>
                        <input
                            type='text'
                            value={newPasswordInputs[password._id] || ''}
                            onChange={(e) => setNewPasswordInputs(prevState => ({ ...prevState, [password._id]: e.target.value }))}
                            placeholder="Enter new password"
                        />
                        <button onClick={() => handleUpdate(password._id)}>Update</button>
                        <button onClick={() => handleDelete(password._id)}>Delete</button>
                        <input
                            type='text'
                            value={newShareInputs[password._id] || ''}
                            onChange={(e) => setNewShareInputs(prevState => ({ ...prevState, [password._id]: e.target.value }))}
                            placeholder="Enter an username"
                        />
                        <button onClick={() => handleShare(password._id)}>Share</button>
                    </td>
                </>
            ) : (<><td></td></>)}
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
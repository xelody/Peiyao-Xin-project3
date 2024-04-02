import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';

import Nav from './Nav'
import PasswordInputForm from './PasswordInputForm';
import PasswordList from './PasswordList';
import { AuthContext } from './AuthContext';

import '../styles/common.css';
import '../styles/inputs.css';

export default function Password() {

    const { isLoggedIn } = useContext(AuthContext);
    const [passwords, setPasswords] = useState([]);

    const handleSubmit = async ({ url, password }) => {
        try {
            const response = await axios.post('/api/password', { url, password });
            // Refresh passwords list after submission
            const updatedPasswords = await fetchPasswords();
            setPasswords(updatedPasswords);
        } catch (error) {
            console.error('Error storing password:', error);
        }
    };

    const fetchPasswords = async () => {
        try {
            const response = await axios.get('/api/password');
            return response.data;
        } catch (error) {
            console.error('Error fetching passwords:', error);
            return [];
        }
    };

    // Fetch passwords on component mount
    useEffect(() => {
        const fetchData = async () => {
            const passwordsData = await fetchPasswords();
            setPasswords(passwordsData);
        };
        fetchData();
    }, []);

    return isLoggedIn ? (
        <div>
            <Nav />
            <PasswordInputForm onSubmit={handleSubmit} />
            <PasswordList passwords={passwords} />
        </div>
    ) : <span>Please Log In First!</span>;
}
import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import '../styles/Header.css';

export default function Header() {
    const { isLoggedIn, setIsLoggedIn, activeUsername, setActiveUsername } = useContext(AuthContext);

    async function checkIfUserIsLoggedIn() {
        try {
            const response = await axios.get('/api/users/isLoggedIn');
            console.log(`check login response: ${JSON.stringify(response)}`);
            setIsLoggedIn(response.data.auth);
            setActiveUsername(response.data.username);
        } catch (error) {
            console.error('Error checking if user is logged in:', error);
        }
    }

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, []);

    return (
        isLoggedIn ?  null : (
        <div className='header'>
            <Link to="/login">Click here to login</Link>
        </div>)
    );
}

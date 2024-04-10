import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './Nav';
import Header from './Header';
import PasswordInputForm from './PasswordInputForm';
import formatDate from "./FormatDate"
import ConfirmationModal from "./ConfirmationModal";
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
    const [pendingRequests, setPendingRequests] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState({});
    const [passwordText, setPasswordText] = useState({});
    const [eyeIcons, setEyeIcons] = useState({});

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
        if (!newPasswordInputs[passwordId]) {
            alert("Password cannot be empty");
            return;
        }

        if (newPasswordInputs[passwordId].length < 4 || newPasswordInputs[passwordId].length > 50) {
            alert("Password length must be between 4 and 50 characters");
            return;
        }

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
        getPendingRequests();
        getAllPasswords();
    }, [activeUsername]);

    const handleAccept = async () => {
        const currentRequest = pendingRequests[currentIndex];
        console.log('Accepted request:', currentRequest._id);
        // Accept the request here
        await acceptRequest(currentRequest._id);
        // Move to the next request
        setCurrentIndex(currentIndex + 1);
    };

    const acceptRequest = async (passwordId) => {
        try {
            const response = await axios.put(`/api/password/pending/${passwordId}`);
            getAllPasswords();
        } catch (error) {
            console.error('Error accepting request:', error);
            alert(JSON.stringify(error.response.data));
        }
    };

    const handleReject = async () => {
        const currentRequest = pendingRequests[currentIndex];
        console.log('Rejected request:', currentRequest._id);
        // Reject the request here
        await rejectRequest(currentRequest._id);
        // Move to the next request
        setCurrentIndex(currentIndex + 1);
    };

    const rejectRequest = async (passwordId) => {
        try {
            const response = await axios.delete(`/api/password/${passwordId}`);
        } catch (error) {
            console.error('Error declining request:', error);
            alert(JSON.stringify(error.response.data));
        }
    };

    async function getPendingRequests() {
        try {
            const response = await axios.get(`/api/password/pending/${activeUsername}`);
            if (response && response.data) {
                setPendingRequests(response.data);
                if (response && response.data) {
                    setPendingRequests(response.data);
                    if (response.data.length > 0) {
                        // Show modal if there are pending requests
                        setShowModal(true);
                    }
                }
            }
        } catch (error) {
            console.error('Error pending share requests:', error);
            alert(JSON.stringify(error.response.data));
        }
    }

    async function getAllPasswords() {
        try {
            const response = await axios.get(`/api/password/${activeUsername}`);
            setPasswords(response.data);
        } catch (error) {
            console.error('Error fetching Passwords:', error);
            alert(JSON.stringify(error.response.data));
        }
    }

    const handleCopyPassword = async (password) => {
        try {
            await navigator.clipboard.writeText(password);
        } catch (error) {
            console.error('Error copying password to clipboard:', error);
            alert('Failed to copy password to clipboard.');
        }
    };

    const handleTogglePasswordVisibility = (passwordId) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [passwordId]: !prevState[passwordId],
        }));

        setEyeIcons((prevState) => ({
            ...prevState,
            [passwordId]: 
                (prevState[passwordId] || faEye) === faEye ? faEyeSlash : faEye,
        }));

        setPasswordText((prevState) => ({
            ...prevState,
            [passwordId]:
                prevState[passwordId] === faEye ? passwords.find(p => p._id === passwordId).password : '●'.repeat(8),
        }));
    };


    const passwordRows = passwords.map(password => {
        const passwordId = password._id;
        const isVisible = passwordVisible[passwordId] || false;
        const text = isVisible ? password.password : '●'.repeat(8);

        return (
            <tr key={password._id}>
                <td>{password.urlAddress}</td>
                <td>
                    <span className='password-text'>{text}</span>
                    <button onClick={() => handleTogglePasswordVisibility(password._id)}>
                        <FontAwesomeIcon icon={eyeIcons[password._id] || faEye} />
                    </button>
                    <button onClick={() => handleCopyPassword(password.password)}>
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                </td>
                <td>{formatDate(password.time)}</td>
                <td>{password.username !== activeUsername ? password.username : ''}</td>
                {password.username === activeUsername ? (
                    <td>
                        <input
                            type='text'
                            value={newPasswordInputs[passwordId] || ''}
                            onChange={(e) => setNewPasswordInputs(prevState => ({ ...prevState, [passwordId]: e.target.value }))}
                            placeholder="Enter new password"
                        />
                        <button onClick={() => handleUpdate(passwordId)}>Update</button>
                        <button onClick={() => handleDelete(passwordId)}>Delete</button>
                        <input
                            type='text'
                            value={newShareInputs[passwordId] || ''}
                            onChange={(e) => setNewShareInputs(prevState => ({ ...prevState, [passwordId]: e.target.value }))}
                            placeholder="Enter an username"
                        />
                        <button onClick={() => handleShare(passwordId)}>Share</button>
                    </td>
                ) : (<td></td>)}
            </tr>
        );
    });


    return isLoggedIn ? (
        <div>
            <Nav isHomeActive={isHomeActive}
                isLogInActive={isLogInActive}
                isPasswordActive={isPasswordActive} />
            {showModal && pendingRequests.length > 0 && currentIndex < pendingRequests.length && (
                <div className="overlay"></div>
            )}
            {showModal && pendingRequests.length > 0 && currentIndex < pendingRequests.length && (
                <div className="modal">
                    <ConfirmationModal
                        message={`User ${pendingRequests[currentIndex].username} wants to share their passwords with you. Do you accept?`}
                        onAccept={handleAccept}
                        onDecline={handleReject}
                    />
                </div>
            )}
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
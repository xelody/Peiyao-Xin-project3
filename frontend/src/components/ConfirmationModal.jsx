import React from 'react';

function ConfirmationModal({ message, onAccept, onDecline }) {
    return (
        <div className="modal">
            <p>{message}</p>
            <div className="button-container">
                <button onClick={onAccept}>Accept</button>
                <button onClick={onDecline}>Decline</button>
            </div>
        </div>
    );
}

export default ConfirmationModal;
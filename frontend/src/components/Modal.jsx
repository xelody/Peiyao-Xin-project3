import React from 'react';
import '../styles/modal.css';

function Modal({ isOpen, onClose, errorMessage }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Error</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-content">
                    <p>{errorMessage}</p>
                </div>
            </div>
        </div>
    );
}

export default Modal;

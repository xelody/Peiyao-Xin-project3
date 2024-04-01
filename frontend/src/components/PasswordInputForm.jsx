import React, { useState } from 'react';
import '../styles/inputs.css';

function PasswordInputForm({ onSubmit }) {
    const [url, setUrl] = useState('');
    const [password, setPassword] = useState('');
    const [alphabet, setAlphabet] = useState(false);
    const [numerals, setNumerals] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [length, setLength] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate input
        if (!url) {
            alert('Please enter a URL');
            return;
        }
        if (!password && !(alphabet || numerals || symbols)) {
            alert('Please enter a password or select at least one checkbox');
            return;
        }
        if (!password && (parseInt(length) < 4 || parseInt(length) > 50)) {
            alert('Password length should be between 4 and 50 characters');
            return;
        }
        // Generate password if not provided
        if (!password) {
            // Generate password logic
        }
        // Submit form
        onSubmit({ url, password });
        // Reset form fields
        setUrl('');
        setPassword('');
        setAlphabet(false);
        setNumerals(false);
        setSymbols(false);
        setLength('');
    };

    return (
        <div className='input-fields'>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>URL: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
                </div>
                <div>
                    <span>Password: </span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                </div>
                <div className='checkbox-container'>
                    <input type="checkbox" checked={alphabet} onChange={(e) => setAlphabet(e.target.checked)} /> Alphabet
                    <input type="checkbox" checked={numerals} onChange={(e) => setNumerals(e.target.checked)} /> Numerals
                    <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> Symbols
                </div>
            
                <div>
                    <span>Length: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Length" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PasswordInputForm;
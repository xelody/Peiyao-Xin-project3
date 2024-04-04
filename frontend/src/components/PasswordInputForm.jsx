import React, { useState } from 'react';
import validUrl from 'valid-url';
import '../styles/inputs.css';

function PasswordInputForm({ onSubmit }) {
    const [url, setUrl] = useState('');
    const [password, setPassword] = useState('');
    const [alphabet, setAlphabet] = useState(false);
    const [numerals, setNumerals] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [length, setLength] = useState('');

    function isValidURL(url) {
        return validUrl.isWebUri(url);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate input
        if (!url || !isValidURL(url)) {
            alert('Please enter a URL');
            return;
        }

        if (password && password.length < 4) {
            alert('Password length should be between 4 and 50 characters');
            return;
        }

        // Generate password if not provided
        let finalPassword = password;
        if (!password) {
            if (parseInt(length) < 4 || parseInt(length) > 50) {
                alert('Password length should be between 4 and 50 characters');
                return;
            }

            if (!(alphabet || numerals || symbols)) {
                alert('Please select at least one checkbox');
                return;
            }

            if (!length) {
                alert('Please enter a desired password length');
                return;
            }

            let selectedChars = '';
            const alphabetChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numberChar = '0123456789';
            const symbolChar = '!@#$%^&*()_+-=[]{}|;:,.<>?';

            // Build a string of characters based on selected checkboxes
            if (alphabet) {
                selectedChars += alphabetChar;
                const randomIndex = Math.floor(Math.random() * alphabetChar.length);
                finalPassword += alphabetChar[randomIndex];
            }
            if (numerals) {
                selectedChars += numberChar;
                const randomIndex = Math.floor(Math.random() * numberChar.length);
                finalPassword += numberChar[randomIndex];
            }
            if (symbols) {
                selectedChars += symbolChar;
                const randomIndex = Math.floor(Math.random() * symbolChar.length);
                finalPassword += symbolChar[randomIndex];
            }

            // Generate the rest of the password randomly from selected characters
            while (finalPassword.length < length) {
                const randomIndex = Math.floor(Math.random() * selectedChars.length);
                finalPassword += selectedChars[randomIndex];
            }
        }
        // Submit form
        onSubmit({ url, password: finalPassword });
    };

    const handleClear = () => {
        // Clear all input fields
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
                <button type="button" onClick={handleClear}>Clear</button>
            </form>
        </div>
    );
}

export default PasswordInputForm;
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

import axios from 'axios';
import { Link } from 'react-router-dom';

import Nav from './Nav'
import Header from './Header';
import '../styles/common.css';

export default function Home() {

    const { isLoggedIn, setIsLoggedIn, activeUsername, setActiveUsername } = useContext(AuthContext);

    const [passwords, setPasswords] = useState([]);
    const isHomeActive = true;
    const isLogInActive = false;
    const isPasswordActive = false;

    async function getAllPasswords() {
        const response = await axios.get('/api/password/');
        setPasswords(response.data);
    }


    const components = [];
    for (let i = 0; i < passwords.length; i++) {
        const pswd = passwords[i];
        const passwordComponent = (<div>{pswd.urlAddress} - {pswd.password}</div>);
        components.push(passwordComponent);
    }

    function setPokemonName(event) {
        const pokemonName = event.target.value;
        setPokemonInput({
            ...pokemonInput,
            /*
            health: pokemonInput.health,
            color: pokemonInput.color,
            */
            name: pokemonName
        })
    }

    function setPokemonColor(event) {
        const pokemonColor = event.target.value;
        setPokemonInput({
            ...pokemonInput,
            /*
            health: pokemonInput.health,
            name: pokemonInput.name,
            */
            color: pokemonColor
        })
    }

    function setPokemonHealth(event) {
        const pokemonHealth = event.target.value;
        setPokemonInput({
            ...pokemonInput,
            /*
            health: pokemonInput.health,
            color: pokemonInput.color,
            */
            health: pokemonHealth,
        })
    }

    return (
        <div>
            <Nav isHomeActive={isHomeActive}
                isLogInActive={isLogInActive}
                isPasswordActive={isPasswordActive} />
            <Header />
            <div>
                <div>{components}</div>
            </div>
        </div>
    )

}
import React from 'react';

import Nav from './Nav'
import Header from './Header';
import '../styles/common.css';
import iconImage from '../assets/icon.png';

export default function Home() {

    const isHomeActive = true;
    const isLogInActive = false;
    const isPasswordActive = false;

    return (
        <div>
            <Nav isHomeActive={isHomeActive}
                isLogInActive={isLogInActive}
                isPasswordActive={isPasswordActive} />
            <div className='content-box box-border'>
                <img src={iconImage} className='icon' alt='Icon' />
                <div>
                    <strong>Welcome to KeyKeeper!</strong><br /><br />
                    KeyKeeper is a Password Manager App that provides a secure and convenient
                    solution for individuals and businesses to track, generate,
                    and share passwords. With the increasing importance of cybersecurity in
                    today's digital landscape, KeyKeeper offers users peace of mind by enabling them to manage their
                    passwords effectively. Users can securely store and organize their passwords
                    for various accounts and services in one centralized location. KeyKeeper also offers
                    the option to generate strong and unique passwords based on user-defined
                    parameters, ensuring enhanced security for online accounts. Moreover, users can
                    securely share passwords with trusted individuals with KeyKeeper accounts.
                </div>
            </div>
            <div className='creator-box'>
                <div>Site Creator: Peiyao Xin</div>
            </div>
        </div>

    )

}
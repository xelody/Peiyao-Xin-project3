import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import '../styles/common.css';

const Nav = () => {
  const { isLoggedIn, setIsLoggedIn, activeUsername, setActiveUsername } = useContext(AuthContext);
  let navigate = useNavigate();

  async function logOutUser() {
    try {
      await axios.post('/api/users/logOut');
      setActiveUsername(null);
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out user:', error);
    }
  }

  console.log(`isLoggedIn? ${isLoggedIn}`);
  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to={`/password/"$activeUsername}`}>Password</Link></li>
            <li></li>
            <li></li>
            <li><div className='username-container'><span className='username'>{activeUsername}</span></div></li>
            <li>
              <button onClick={logOutUser}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/password">Password</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

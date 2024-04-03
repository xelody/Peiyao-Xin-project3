import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import '../styles/common.css';

const Nav = (props) => {
  const { isLoggedIn, setIsLoggedIn, activeUsername, setActiveUsername } = useContext(AuthContext);
  let navigate = useNavigate();
  const { isHomeActive, isLogInActive, isPasswordActive} = props;
  let homeLiStyle = '';
  let loginLiStyle = '';
  let passwordLiStyle = '';

  if (isHomeActive) {
    homeLiStyle += 'active-li-text';
  }

  if (isLogInActive) {
    loginLiStyle += 'active-li-text';
  }

  if (isPasswordActive) {
    passwordLiStyle += 'active-li-text';
  }

  console.log(loginLiStyle);

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

  return (
    <nav>
      <ul>
        <li><Link to="/"><span className={homeLiStyle}>Home</span></Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to={`/password/"$activeUsername}`}><span className={passwordLiStyle}>Password</span></Link></li>
            <li></li>
            <li></li>
            <li><div className='username-container'><span className='username'>{activeUsername}</span></div></li>
            <li>
              <button onClick={logOutUser}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login"><span className={loginLiStyle}>Log in</span></Link></li>
            <li><Link to="/password"><span className={passwordLiStyle}>Password</span></Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

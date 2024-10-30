import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContextObj } from '../Context/UserContext';

function Header() {
  const { loginStatus, currentUser, logout } = useContext(UserContextObj);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  useEffect(()=> handleLogout,[]);

  return (
    <nav className='shadow d-flex justify-content-between p-2 bg'>
      <div>
        <Link className='nav-link' to=''>Logo</Link>
      </div>
      <div className='d-flex gap-3'>
        <NavLink className="nav-link hover:text-fuchsia-600 focus:text-orange-600 active:text-red-700" to='/'>Home</NavLink>
        {
          currentUser ? (
            <div className="d-flex gap-3">
              <p className="text-success">{currentUser.username}({currentUser.userType})</p>
              <NavLink className="nav-link hover:text-fuchsia-600 focus:text-orange-600 active:text-red-700" to='/login' onClick={handleLogout}>
                Logout
              </NavLink>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <NavLink className="nav-link hover:text-fuchsia-600 focus:text-orange-600 active:text-red-700" to='/login'>Login</NavLink>
              <NavLink className="nav-link hover:text-fuchsia-600 focus:text-orange-600 active:text-red-700" to='/signup'>Signup</NavLink>
            </div>
          )
        }
      </div>
    </nav>
  );
}

export default Header;

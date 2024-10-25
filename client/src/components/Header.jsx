import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContextObj } from '../Context/UserContext';

function Header() {
  const { loginStatus, currentUser, logoutUser, logout } = useContext(UserContextObj);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <nav className='shadow d-flex justify-content-between p-2 bg'>
      <div>
        <Link className='nav-link' to=''>Logo</Link>
      </div>
      <div className='d-flex gap-3'>
        <NavLink className="nav-link hover:text-fuchsia-600 focus:text-orange-600 active:text-red-700" to='/'>Home</NavLink>
        {
          loginStatus && currentUser ? (
            <div className="d-flex gap-3">
              <p className="text-success">Hey, {currentUser.username}!</p>
              <NavLink 
                className="nav-link hover:text-fuchsia-600 focus:text-orange-600 active:text-red-700" 
                to='/login' 
                onClick={handleLogout}
              >
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

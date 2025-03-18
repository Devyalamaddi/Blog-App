import React, { useContext } from 'react';
import { UserContextObj } from '../Context/UserContext';


function AdminProfile() {
  const {currentUser, setCurrentUser} = useContext(UserContextObj);
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    setCurrentUser(JSON.parse(savedUser));
  }
  return (
    
    <div className="container">
      <h1 className="display-3">{currentUser.username}</h1>
      <h3 className="display-5">{currentUser.email}</h3>
    </div>
  )
}

export default AdminProfile
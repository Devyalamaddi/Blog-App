import React,{useContext} from 'react'
import {UserContextObj} from '../Context/UserContext';
import { Link } from 'react-router-dom';


function UserProfile() {
  const {currentUser, setCurrentUser} = useContext(UserContextObj);
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    setCurrentUser(JSON.parse(savedUser));
  }
  return (
    <div className="container">
      <h1 className="display-3">{currentUser.username}</h1>
      <h3 className="display-5">{currentUser.email}</h3>
      <Link to ="article" className='text-green-800'>New article</Link>
    </div>
  )
}

export default UserProfile
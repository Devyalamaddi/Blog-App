import React,{useContext} from 'react'
import {UserContextObj} from '../Context/UserContext';
import Articles from '../components/Articles';


function UserProfile() {
  const {currentUser, setCurrentUser} = useContext(UserContextObj);
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    setCurrentUser(JSON.parse(savedUser));
  }
  return (
    <div className="container">
      <h1 className="display-6">Welcome, <span className="text-green-400">{currentUser.username}</span>!</h1>
      <p className="text-gray-500">{currentUser.email}</p>
      <div className="px-4 mx-auto border-black shadow">
        <Articles/>
      </div>
    </div>
  )
}

export default UserProfile
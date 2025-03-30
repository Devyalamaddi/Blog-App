import { createContext, useState } from 'react';
import axios from 'axios';

export const UserContextObj = createContext();

function UserContext({ children }) {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [error, setErrors] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [count,setCount] = useState(0);
  

  async function registerUser(userObj) {
    try {
      const res = await axios.post('https://blog-app-backend-17rk.onrender.com/user-api/userregistration', userObj);
      setUsers([...users, res.data]);
      return res.data.message;
    } catch (err) {
      setErrors && setErrors(err.message);
      throw new Error(err.message);
    }
  }

  async function registerAdmin(userObj) {
    try {
      const res = await axios.post('https://blog-app-backend-17rk.onrender.com/admin-api/adminregistration', userObj);
      setAdmins([...admins, res.data]);
      return res.data.message;
    } catch (err) {
      setErrors && setErrors(err.message);
      throw new Error(err.message);
    }
  }

  async function registerAuthor(userObj) {
    try {
      const res = await axios.post('https://blog-app-backend-17rk.onrender.com/author-api/authorregistration', userObj);
      setAuthors([...authors, res.data]);
      return res.data.message;
    } catch (err) {
      setErrors && setErrors(err.message);
      throw new Error(err.message);
    }
  }

  async function loginUser(userObj) {
    try {
      const res = await axios.post('https://blog-app-backend-17rk.onrender.com/user-api/userlogin', userObj);
      setCurrentUser(res.data.user);
      return res;
    } catch (err) {
      setErrors && setErrors(err.message);
      throw new Error(err.message);
    }
  }

  async function loginAdmin(userObj) {
    try {
      const res = await axios.post('https://blog-app-backend-17rk.onrender.com/admin-api/adminlogin', userObj);
      setCurrentUser(res.data.user);
      return res;
    } catch (err) {
      setErrors && setErrors(err.message);
      throw new Error(err.message);
    }
  }

  async function loginAuthor(userObj) {
    try {
      const res = await axios.post('https://blog-app-backend-17rk.onrender.com/author-api/authorlogin', userObj);
      const curUser = { ...res.data.user, token: res.data.token };
      localStorage.setItem('token', curUser.token);
      console.log(curUser);
      return res;
    } catch (err) {
      setErrors && setErrors(err.message);
      throw new Error(err.message);
    }
  }


  function logout() {
    localStorage.clear();
    setLoginStatus(false);
    setCurrentUser(null);
  }


  return (
    <UserContextObj.Provider value={{ registerUser, registerAdmin, registerAuthor, loginUser, loginAdmin, loginAuthor, loginStatus, setLoginStatus, error, setCurrentUser, currentUser, logout, count, setCount}}>
      {children}
    </UserContextObj.Provider>
  );
}

export default UserContext;

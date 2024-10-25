import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContextObj = createContext();

function UserContext({ children }) {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [error, setErrors] = useState(null);

  // Registration functions
  async function registerUser(userObj) {
    try {
      const res = await axios.post('http://localhost:4000/user-api/userregistration', userObj);
      setUsers([...users, res.data]);
      return res.data.message;
    } catch (err) {
      setErrors(err.message);
      throw new Error(err.message);
    }
  }

  async function registerAdmin(userObj) {
    try {
      const res = await axios.post('http://localhost:4000/admin-api/adminregistration', userObj);
      setAdmins([...admins, res.data]);
      return res.data.message;
    } catch (err) {
      setErrors(err.message);
      throw new Error(err.message);
    }
  }

  async function registerAuthor(userObj) {
    try {
      const res = await axios.post('http://localhost:4000/author-api/authorregistration', userObj);
      setAuthors([...authors, res.data]);
      return res.data.message;
    } catch (err) {
      setErrors(err.message);
      throw new Error(err.message);
    }
  }

  return (
    <UserContextObj.Provider value={{ registerUser, registerAdmin, registerAuthor, error }}>
      {children}
    </UserContextObj.Provider>
  );
}

export default UserContext;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthorRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/author-api/authorregistration', {
        userType: 'author',
        username,
        password,
        email
      });
      setMessage(response.data.message);
      navigate('/author-login');
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2>Author Registration</h2>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AuthorRegistration;

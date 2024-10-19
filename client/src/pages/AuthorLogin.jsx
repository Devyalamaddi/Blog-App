import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/author-api/authorlogin', {
        username,
        password,
      });
      setMessage(response.data.message);
      if (response.data.token) {
        // Store token or perform further actions
        navigate('/articles');
      }
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <h2>Author Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AuthorLogin;

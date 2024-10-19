import { useState } from 'react';
import { registerAuthor } from '../services/api';

const AuthorRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerAuthor({ username, password });
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2>Author Registration</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AuthorRegistration;
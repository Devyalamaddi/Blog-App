import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Blog App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/user-registration">User Registration</Link>
          </li>
          <li>
            <Link to="/admin-registration">Admin Registration</Link>
          </li>
          <li>
            <Link to="/author-registration">Author Registration</Link>
          </li>
          <li>
            <Link to="/user-login">User Login</Link>
          </li>
          <li>
            <Link to="/admin-login">Admin Login</Link>
          </li>
          <li>
            <Link to="/author-login">Author Login</Link>
          </li>
          <li>
            <Link to="/articles">View Articles</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;

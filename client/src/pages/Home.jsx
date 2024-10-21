import React from 'react';
import {Link} from 'react-router-dom'
import './Home.css'; 

function Home(){
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to My Blog</h1>
        <p>Explore articles, ideas, and insights. Stay updated with the latest posts!</p>
        <Link className='nav-link' to='/signup'>Get Started</Link>
      </div>

      {/* About Section */}
      <div className="about">
        <h2>About This Blog</h2>
        <p>
          This blog covers a range of topics including tech, lifestyle, and personal growth. Our
          mission is to provide valuable and engaging content to our readers.
        </p>
        <ul>
          <li>Tech tutorials and news</li>
          <li>Tips for personal development</li>
          <li>Industry insights</li>
        </ul>
        <blockquote>
          "A blog that brings value to the community is more than just a website—it's a movement."
        </blockquote>
      </div>

      {/* Latest Posts Section */}
      <div className="posts">
        <h2>Latest Posts</h2>
        <div className="post-item">
          <h3>How to Learn React Fast</h3>
          <p>Discover the key steps and resources to mastering React in no time...</p>
          <a href="#" className="link">Read More</a>
        </div>
        <div className="post-item">
          <h3>Top 5 Productivity Tips for Developers</h3>
          <p>Increase your productivity with these proven tips...</p>
          <a href="#" className="link">Read More</a>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="subscribe">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get the latest posts and exclusive content delivered directly to your inbox.</p>
        <input type="email" placeholder="Enter your email" className="email-input" />
        <button className="btn">Subscribe</button>
      </div>
    </div>
  );
};

export default Home;

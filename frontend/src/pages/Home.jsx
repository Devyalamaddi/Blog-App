import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const updateTheme = () => {
      const theme = localStorage.getItem("theme") === "dark";
      setIsDarkMode(theme);
      document.documentElement.classList.toggle("dark", theme);
    };

    updateTheme();
    window.addEventListener("storage", updateTheme);
    return () => window.removeEventListener("storage", updateTheme);
  }, []);

  return (
    <div className="p-5 max-w-6xl mx-auto shadow-xl mt-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg mb-6">Explore articles, ideas, and insights. Stay updated with the latest posts!</p>
        <Link className="px-6 py-2 rounded-lg shadow-md btn-primary" to="/signup">
          Get Started
        </Link>
      </div>

     {/* About Section */}
    <div className="p-8 rounded-lg shadow-md my-12 about text-[var(--text-primary)]">
      <h2 className="text-2xl font-semibold mb-4">About This Blog</h2>
      <p className="text-lg mb-4">
        This blog covers a range of topics including tech, lifestyle, and personal growth. Our
        mission is to provide valuable and engaging content to our readers.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Tech tutorials and news</li>
        <li>Tips for personal development</li>
        <li>Industry insights</li>
      </ul>
      <blockquote className="mt-6 italic border-l-4 pl-4" style={{ borderColor: 'var(--primary)' }}>
        "A blog that brings value to the community is more than just a website—it's a movement."
      </blockquote>
    </div>


      {/* Latest Posts Section */}
      <div className="my-12">
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg shadow-md card">
            <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">How to Learn React Fast</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Discover the key steps and resources to mastering React in no time...</p>
            <a href="#" className="text-blue-600 hover:underline">Read More</a>
          </div>
          <div className="p-6 rounded-lg shadow-md card">
            <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Top 5 Productivity Tips for Developers</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Increase your productivity with these proven tips...</p>
            <a href="#" className="text-blue-600 hover:underline">Read More</a>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="p-8 rounded-lg shadow-md text-center my-12" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <h2 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg mb-6">Get the latest posts and exclusive content delivered directly to your inbox.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input type="email" placeholder="Enter your email" className="p-3 rounded-md w-full md:w-96" style={{ color: 'var(--foreground)' }} />
          <button className="px-6 py-3 rounded-md shadow-md btn-primary">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
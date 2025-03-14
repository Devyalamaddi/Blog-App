import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About This Blog</h3>
          <p className="text-sm">
            Welcome to our blog! Stay updated with the latest articles on web development, technology, and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-primary transition">About</a></li>
            <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
            <li><a href="/privacy" className="hover:text-primary transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-primary transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-6 pt-4 text-center text-sm">
        <p>&copy; 2024 BlogApp | Designed by <span className="font-semibold">Devendra</span></p>
      </div>
    </footer>
  );
};

export default Footer;

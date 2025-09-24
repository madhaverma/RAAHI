import React from 'react';
import '../Footer.css'; // Import the stylesheet
// Import social icons from react-icons
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';
// You can add more icons like FaXing, FaLinkedin, etc. as needed

const SimpleFooter = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "Greater Noida Authority"; // Your company name here

  return (
    <footer className="simple-footer-container">
      <p className="copyright-text">
        &copy; {currentYear} {companyName}. All rights reserved.
      </p>

      <div className="social-links">
        {/* Replace '#' with your actual social media URLs */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
          <FaInstagram />
        </a>
        {/* Example of other social links from your image */}
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
};

export default SimpleFooter;
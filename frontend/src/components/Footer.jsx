import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Create and style this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@college-records.com</p>
          <p>Phone: +91-9876543210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} eLabTracker - Your Virtual College Lab Record System | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

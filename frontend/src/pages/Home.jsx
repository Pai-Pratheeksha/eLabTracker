// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/homeimg1.jpg';
import img2 from '../assets/homeimg2.jpg';
import img3 from '../assets/homeimg3.jpg';
import { motion } from 'framer-motion';
import './ImageShowcase.css';

const images = [img1, img2, img3];

const HomePage = () => {

    return (
        <div className="home-container">
        <nav className="navbar-home">
            <h1>eLabTracker - Your Virtual College Lab Record System</h1>
            <div>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
            </div>
        </nav>

        <section className="hero-section">
            <h2>Welcome to the Digital Lab Record Portal</h2>
            <p>Manage, submit, and track your lab records efficiently and securely.</p>
        </section>
        
        <section className="image-showcase-container">
            {images.map((src, index) => (
                <motion.img
                key={index}
                src={src}
                alt={`Visual ${index + 1}`}
                className={`image-circle image-${index}`}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.5, duration: 0.8, type: 'spring' }}
                />
            ))}
        </section>

        <section className="intro-section">
            <h3>Introduction</h3>
            <p>This platform helps Computer Science and Engineering students and faculty manage lab records online.</p>
            <p>Features include user login, role-based access, and easy submission of practical files and reports.</p>
        </section>
        </div>
    );
};

export default HomePage;

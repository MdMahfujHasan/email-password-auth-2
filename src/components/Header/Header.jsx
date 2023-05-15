import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='d-flex justify-content-center mt-2 mb-4'>
            <Link className='text-secondary me-3 text-decoration-none' to="/">Home</Link>
            <Link className='text-secondary me-3 text-decoration-none' to="/login">Login</Link>
            <Link className='text-secondary me-3 text-decoration-none' to="/register">Register</Link>
        </nav>
    );
};

export default Header;
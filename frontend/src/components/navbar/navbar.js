import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className='Navbar'>
            <div className="navbar-left">
                <a href="/home" className="logo">
                TruckLink
                </a>
            </div>
            <div className="navbar-right">
                <button className="logout" onClick={() => {
                    localStorage.removeItem('token'); 
                    navigate('/');
                }}>
                Logout
                </button>
            </div>
            
        </nav>
    )
}

export default Navbar;
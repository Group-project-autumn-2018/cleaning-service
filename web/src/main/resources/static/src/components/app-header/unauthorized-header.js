import React from 'react';
import './app-header.css'
import {Link} from "react-router-dom";


const UnauthorizedHeader = () => {
    return (

        <div>
            <nav className="navbar navbar-expand-lg justify-content-between">
                <Link className="navbar-brand" to="/">Cleaning service</Link>
                <div className="navbar navbar-expand mr-5" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Профиль</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/registration" className="nav-link">Sign up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Sign in</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default UnauthorizedHeader;
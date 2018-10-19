import React from 'react';
import {BrowserRouter ,Route, Link} from "react-router-dom";
import SignIn from '../sign-in/sign-in';
import './app-header.css'



const UnauthorizedHeader = () => {
    return (
        <BrowserRouter>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Cleaning service</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="">Sign up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login">Sign in</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route path="/login" component={SignIn}/>
            </div>

        </BrowserRouter>
    );
};

export default UnauthorizedHeader;
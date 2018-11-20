import React from 'react';
import './home-main-section.css';
import {Link} from "react-router-dom";

const HomeMainSection = () => {
    return (
        <div>
            <div className="container main-section">
                <div className="description text-center">
                    <h1>
                        “. . . meekness, love, purity, these are the things that should magnify us.”
                        ― Joseph Smith Jr.
                    </h1>
                    <Link className="btn btn-primary btn-lg col-sm-3" to="/booking">Book a cleaner</Link>
                </div>
            </div>
        </div>
    );
};

export default HomeMainSection;

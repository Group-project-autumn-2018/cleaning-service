import React from 'react';
import './home-main-section.css';
import {Link} from "react-router-dom";

const HomeMainSection = () => {
    return (
        <div>
            <div className="container main-section">
                <div className="description text-center">
                    <h1>
                        Чисто там - где убирают
                    </h1>
                    <Link className="btn btn-primary btn-lg col-sm-3" to="/booking">Заказать уборку</Link>
                </div>
            </div>
        </div>
    );
};

export default HomeMainSection;

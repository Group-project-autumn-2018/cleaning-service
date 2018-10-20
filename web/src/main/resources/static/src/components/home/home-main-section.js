import React from 'react';
import './home-main-section.css';



const HomeMainSection = () => {
    return(
        <div>
            <div className="container main-section">
                <div className="description text-center">
                    <h1>
                        Чисто там где убирают
                    </h1>
                    <button className="btn btn-primary btn-lg ">Заказать уборку</button>
                </div>
            </div>
        </div>
    );
};

export default HomeMainSection;

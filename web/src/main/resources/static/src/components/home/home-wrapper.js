import React from 'react';
import './home-wrapper.css';
import {BrowserRouter} from "react-router-dom";
import AppHeader from '../app-header/index';
import ProfileForm from '../customers-profile-form/profile-form'
import AppRouting from "../routing";

const HomeWrapper = () => {
    return (

        <BrowserRouter>
            <div className="home-wrapper ">
                <AppHeader/>
                <AppRouting/>
            </div>
        </BrowserRouter>
    );
};

export default HomeWrapper;
import React from 'react';
import './home-wrapper.css';
import HomeMainSection from './home-main-section';
import {BrowserRouter ,Route, Switch} from "react-router-dom";
import SignIn from '../sign-in/sign-in';
import AppHeader from '../app-header/index';

const HomeWrapper = () => {
    return (

        <BrowserRouter>
            <div className="home-wrapper ">
                <AppHeader/>
                <Switch>
                    <Route exact path="/" component={HomeMainSection}/>
                    <Route path="/login" component={SignIn}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default HomeWrapper;
import React from 'react';
import HomeMainSection from '../home/home-main-section';
import {Route, Switch} from "react-router-dom";
import SignIn from '../sign-in';
import CustomerRegistration from '../sign-up/sign-up-customer';
import SignUpMainSection from "../sign-up/sign-up-main-section";

const AppRouting = () => {
  return (
      <Switch>
          <Route exact path="/" component={HomeMainSection}/>
          <Route path="/login" component={SignIn}/>
          <Route exact path="/registration" component={SignUpMainSection}/>
          <Route path="/registration/customer" component={CustomerRegistration}/>
      </Switch>
  )
};

export default AppRouting;
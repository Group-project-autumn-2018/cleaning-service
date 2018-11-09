import React from 'react';
import HomeMainSection from '../home/home-main-section';
import {Route, Switch} from "react-router-dom";
import SignIn from '../sign-in';
import CustomerRegistration from '../sign-up/sign-up-customer';
import SignUpMainSection from "../sign-up/sign-up-main-section";
import AdminMain from "../admin/admin-main";
import ProfileForm from "../customers-profile-form/profile-form";
import Logout from '../logout/logout';

const AppRouting = () => {
  return (
      <Switch>
          <Route exact path="/" component={HomeMainSection}/>
          <Route path="/login" component={SignIn}/>
          <Route exact path="/registration" component={SignUpMainSection}/>
          <Route path="/registration/customer" component={CustomerRegistration}/>
          <Route path="/admin" component={AdminMain}/>
          <Route path="/profile" component={ProfileForm}/>
          <Route path="/logout" component={Logout}/>
      </Switch>
  )
};

export default AppRouting;
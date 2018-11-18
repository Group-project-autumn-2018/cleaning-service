import React, {Component, Fragment} from 'react';
import HomeMainSection from '../home/home-main-section';
import ProfileForm from "../customers-profile-form/profile-form";
import Logout from '../logout/logout';
import SignIn from '../sign-in';
import AdminMain from "../admin/admin-main";
import {Redirect, Route, Switch} from "react-router-dom";
import SignUpMainSection from '../sign-up/sign-up-main-section';
import CustomerRegistration from '../sign-up/sign-up-customer';
import Feedback from '../feedback';
import BookingForm from '../booking-form/booking-form'
import Companies from '../companies/companies'
import ProfileService from '../service-profile/profile-form';

class AppRouting extends Component {

    render() {

        let routes = (
            <Switch>
                <Route exact path="/" component={HomeMainSection}/>
                <Route path="/login" component={SignIn}/>
                <Route exact path="/registration" component={SignUpMainSection}/>
                <Route path="/registration/customer" component={CustomerRegistration}/>
                <Route path="/booking" component={BookingForm}/>
                <Route path="/companies" component={Companies}/>
                <Route exact path="/profile/service" component={ProfileService}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = this.props.isAdmin ? (
                    <Switch>
                        <Route exact path="/" component={HomeMainSection}/>
                        <Route path="/profile" component={ProfileForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/admin" component={AdminMain}/>
                        <Route path="/login" component={SignIn}/>
                        <Redirect to="/"/>
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/" component={HomeMainSection}/>
                        <Route path="/profile" component={ProfileForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/login" component={SignIn}/>
                        <Route path="/feedback" component={Feedback}/>
                        <Route path="/booking" component={BookingForm}/>
                        <Route path="/companies" component={Companies}/>
                        <Redirect to="/"/>
                    </Switch>
            )
        }

        return (
            <Fragment>
                {routes}
            </Fragment>
        );
    }

}

export default AppRouting;
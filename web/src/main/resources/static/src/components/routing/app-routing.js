import React, {Fragment, Component} from 'react';
import HomeMainSection from '../home/home-main-section';
import ProfileForm from "../customers-profile-form/profile-form";
import Logout from '../logout/logout';
import SignIn from '../sign-in';
import AdminMain from "../admin/admin-main";
import {Route, Switch, Redirect} from "react-router-dom";
import SignUpMainSection from '../sign-up/sign-up-main-section';
import CustomerRegistration from '../sign-up/sign-up-customer';
import Feedback from '../feedback';

class AppRouting extends Component {

    render() {


        let routes = (
            <Switch>
                <Route exact path="/" component={HomeMainSection}/>
                <Route path="/login" component={SignIn}/>
                <Route exact path="/registration" component={SignUpMainSection}/>
                <Route path="/registration/customer" component={CustomerRegistration}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = this.props.isAdmin ?
                (
                    <Switch>
                        <Route exact path="/" component={HomeMainSection}/>
                        <Route path="/profile" component={ProfileForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/admin" component={AdminMain}/>
                        <Route path="/login" component={SignIn}/>
                        <Redirect to="/"/>
                    </Switch>
            ) :
            (
                <Switch>
                    <Route exact path="/" component={HomeMainSection}/>
                    <Route path="/profile" component={ProfileForm}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/feedback" component={Feedback}/>
                    <Redirect to="/"/>
                </Switch>)
        }

        return (
            <Fragment>
                {routes}
            </Fragment>
        );
    }

}
export default AppRouting;
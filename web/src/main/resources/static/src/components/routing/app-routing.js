import React, {Component, Fragment} from 'react';
import HomeMainSection from '../home/home-main-section';
import Logout from '../logout/logout';
import SignIn from '../sign-in';
import AdminMain from "../admin/admin-main";
import {Redirect, Route, Switch} from "react-router-dom";
import SignUpMainSection from '../sign-up/sign-up-main-section';
import ServiceRegistration from '../sign-up/sign-up-service'
import CustomerRegistration from '../sign-up/sign-up-customer';
import CompanyConfirmModalForm from '../companies/company-confirm-modal-form';
import Feedback from '../feedback';
import BookingForm from '../booking-form/booking-form'
import Companies from '../companies/companies'
import MainProfile from '../main-profile';
import ServiceInfo from "../service-info/service-info";
import CustomerOrdersList from '../customer-orders/customer-orders-list';
//import CompaniesList from '../customer-orders/';

class AppRouting extends Component {

    render() {

        let routes = (
            <Switch>
                <Route exact path="/" component={HomeMainSection}/>
                <Route path="/login" component={SignIn}/>
                <Route exact path="/registration" component={SignUpMainSection}/>
                <Route path="/registration/customer" component={CustomerRegistration}/>
                <Route path="/registration/service" component={ServiceRegistration}/>
                <Route path="/booking" component={BookingForm}/>
                <Route path="/companies" component={Companies} />
                {/*<Route exact path="/companies-search" component={CompanyForSearching} />*/}
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = this.props.isAdmin ? (
                <Switch>
                    <Route exact path="/" component={HomeMainSection}/>
                    <Route path="/profile" component={MainProfile}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/admin" component={AdminMain}/>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/company/:id/feedback" render={({match}) => {
                        const {id} = match.params;
                        return <Feedback serviceId={id} />
                    }}/>
                    <Route path="/booking" component={BookingForm}/>
                    <Route path="/companies" component={Companies}/>
                    <Route path="/customer/orders" component={CustomerOrdersList}/>
                    <Redirect to="/"/>
                </Switch>
            ) : (
                <Switch>
                    <Route exact path="/" component={HomeMainSection}/>
                    <Route path="/profile" component={MainProfile}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/company/:id/feedback" render={({match}) => {
                        const {id} = match.params;
                        return <Feedback serviceId={id} />
                    }}/>
                    <Route path="/booking" component={BookingForm}/>
                    <Route exact path="/companies" component={Companies}/>
                    <Route exact path="/company/:id" render={({match}) => {
                        const {id} = match.params;
                        return <ServiceInfo itemId={id} />
                    }}/>
                    <Route path="/service/orders/:id"
                           render={({match}) => {
                               const {id} = match.params;
                               return <CompanyConfirmModalForm orderId={id}/>
                           }}
                    />
                    <Route path="/customer/orders" component={CustomerOrdersList}/>
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
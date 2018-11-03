import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import AdminCustomers from './customer/admin-customers'
import AdminCleaning from "./cleaning/admin-cleaning";

const AdminMain = () => {
    return(
        <div className="bg-light container-fluid w-100 h-100">
            <ul className="nav nav-tabs" role="tablist" >
                <li className="nav-item">
                    <Link to="/admin" className="nav-link active" data-toggle="tab" role="tab" aria-controls="admin-customers" aria-selected="true" >Customers</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/services" className="nav-link" data-toggle="tab" role="tab" aria-selected="false" >Cleaning services</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path="/admin" component={AdminCustomers}/>
                <Route exact path="/admin/services" component={AdminCleaning}/>
            </Switch>
        </div>
    )
};


export default AdminMain;
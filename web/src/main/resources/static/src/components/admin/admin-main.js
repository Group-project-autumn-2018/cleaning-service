import React, {Component} from 'react';
import {Link, Route, Switch, withRouter} from "react-router-dom";
import AdminCustomers from './customer/admin-customers'
import AdminCleaning from "./cleaning/admin-cleaning";

class AdminMain extends Component {

    componentDidMount() {
        this.props.history.push(this.props.match.url + '/customers')
    }

    render() {
        return (
            <div className="bg-light container-fluid w-100 h-100">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <Link to={this.props.match.url + '/customers'} className="nav-link active" data-toggle="tab"
                              role="tab" aria-controls="admin-customers" aria-selected="true">Customers</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={this.props.match.url + '/service'} className="nav-link" data-toggle="tab" role="tab"
                              aria-selected="false">Cleaning
                            services</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path={this.props.match.url + '/customers'} component={AdminCustomers}/>
                    <Route path={this.props.match.url + '/service'} component={AdminCleaning}/>
                </Switch>
            </div>
        )
    }

}

export default withRouter(AdminMain);
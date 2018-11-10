import React, {Component} from 'react';
import './app-header.css';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import NavigationItem from './NavigationItem';

class AppHeader extends Component {


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg justify-content-between">
                    <Link className="navbar-brand" to="/">Cleaning service</Link>
                    <div className="navbar navbar-expand mr-5" id="navbarNav">

                        {this.props.isAuthenticated ?
                            <ul className="navbar-nav">
                                {this.props.role[0] === 'admin' ?
                                    <NavigationItem link="/admin">Admin</NavigationItem> : null}
                                <NavigationItem link="/profile">You logged in as <u>{this.props.name}</u></NavigationItem>
                                <NavigationItem link="/logout">Log Out</NavigationItem>
                            </ul> :
                            <ul className="navbar-nav">
                                <NavigationItem link="/registration">Sign Up</NavigationItem>
                                <NavigationItem link="/login">Sign In</NavigationItem>
                            </ul>
                        }
                    </div>
                </nav>
            </div>
        )
    }
}
;

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

export default connect(mapStateToProps)(AppHeader);
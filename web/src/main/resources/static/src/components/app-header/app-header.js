import React, {Component} from 'react';
import AuthorizedHeader from './authorized-header';
import UnauthorizedHeader from './unauthorized-header';
import './app-header.css';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class AppHeader extends Component {


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg justify-content-between">
                    <Link className="navbar-brand" to="/">Cleaning service</Link>
                    <div className="navbar navbar-expand mr-5" id="navbarNav">

                            {this.props.isAuthenticated ?
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link">You logged in as {this.props.name}</Link>
                                    </li>
                                </ul> : ''
                            }

                            {this.props.role.indexOf("admin") >= 0 ?
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/admin" className="nav-link">Admin</Link>
                                    </li>
                                </ul> : ''
                            }

                            {!this.props.isAuthenticated ?
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/registration" className="nav-link">Sign up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">Sign in</Link>
                                    </li>
                                </ul> : ''
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
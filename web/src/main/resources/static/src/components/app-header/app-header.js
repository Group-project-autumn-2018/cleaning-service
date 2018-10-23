import React, {Component} from 'react';
import AuthorizedHeader from './authorized-header';
import UnauthorizedHeader from './unauthorized-header';
import './app-header.css';

export default class AppHeader extends Component {
    changeAuthStatus = () => {
        this.setState(({isAuthenticated}) => {
            return {
                isAuthenticated: !isAuthenticated
            };
        });
    };

    constructor() {
        super();
        this.state = {
            isAuthenticated: false
        }
    }

    render() {
        let {isAuthenticated: isAuthenticated} = this.props;
        let currentAuthStatus = this.state.isAuthenticated.toString();
        if (isAuthenticated === undefined) isAuthenticated = currentAuthStatus;
        if (isAuthenticated !== currentAuthStatus) this.changeAuthStatus();
        if (isAuthenticated === 'true') {
            return <AuthorizedHeader/>;
        } else {
            return <UnauthorizedHeader/>;
        }
    }
}
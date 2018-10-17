import React, {Component} from 'react';
import AuthorizedHeader from './authirized-header';
import UnauthorizedHeader from './unauthirized-header';
import './app-header.css';

export default class AppHeader extends Component {
    changeAuthStatus = () => {
        this.setState(({isAuthentificated}) => {
            return {
                isAuthentificated: !isAuthentificated
            };
        });
    };

    constructor() {
        super();
        this.state = {
            isAuthentificated: false
        }
    }

    render() {
        let {isAuthentificated} = this.props;
        let currentAuthStatus = this.state.isAuthentificated.toString();
        if (isAuthentificated === undefined) isAuthentificated = currentAuthStatus;
        if (isAuthentificated !== currentAuthStatus) this.changeAuthStatus();
        if (isAuthentificated === 'true') {
            return <AuthorizedHeader/>;
        } else {
            return <UnauthorizedHeader/>;
        }
    }
}
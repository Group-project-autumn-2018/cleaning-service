import React, {Component} from 'react';
import {connect} from 'react-redux';
import {parseJwtToken, authSuccess} from '../actions/auth-actions';

class SocialLogin extends Component {

    componentDidMount() {
        const queryParams = this.props.location.search;
        const token = queryParams.substring(queryParams.indexOf("=") + 1);
        const decodedToken = parseJwtToken(token);
        const tokenExpirationDate = Date.now() + (decodedToken.expiration * 1000);
        const payload = {
            isAuthenticated: true,
            name: decodedToken.name,
            email: decodedToken.user_name,
            role: decodedToken.authorities,
            token: token,
            tokenExpirationDate: tokenExpirationDate
        };
        this.props.authSuccess(payload);
    }

    render() {
        return (
            <div></div>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authSuccess: (payload) => {
            dispatch(authSuccess(payload));
        }
    }
};

export default connect(null, mapDispatchToProps)(SocialLogin);
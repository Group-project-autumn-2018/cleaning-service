import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authSuccess, parseJwtToken, authFail} from '../actions/auth-actions';

class SocialLogin extends Component {

    componentDidMount() {
        const queryParams = this.props.location.search;
        const param = queryParams.substring(1, queryParams.indexOf("="));
        console.log(queryParams);
        console.log(param);
        switch (param) {
            case "error":
                const error = queryParams.substring(queryParams.indexOf("=") + 1).replace(/%20/g, " ");
                this.props.authFail(error);
                this.props.history.push("/login");
                break;
            case "token":
                this.successAuthHandler(queryParams);
                break;
        }
    }

    successAuthHandler(queryParams) {
        const token = queryParams.substring(queryParams.indexOf("=") + 1);
        const decodedToken = parseJwtToken(token);
        const tokenExpirationDate = Date.now() + (decodedToken.expiration * 1000);
        const payload = {
            address: {
                address: decodedToken.address.address,
                lat: decodedToken.address.lat,
                lon: decodedToken.address.lon
            },
            id: decodedToken.user_id,
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
        },
        authFail: (payload) => {
            dispatch(authFail(payload));
        }
    }
};

export default connect(null, mapDispatchToProps)(SocialLogin);
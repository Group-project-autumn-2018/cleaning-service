import React from 'react';
import {Link} from 'react-router-dom';
import './sign-up.css';

const SignUpMainSection = () => {

    const cardStyle = {
        width: 18 + 'rem'
    };

    return (
        <div className="container signup-component">
            <div className="overlay"/>
            <div className="registration-mode card-deck custom-card-group">
                <div className="card">
                    <i className="custom-icon card-img-top fa fa-user-circle fa-8x"/>
                    <div className="card-body">
                        <Link to='/registration/customer' className="btn btn-info btn-lg btn-block">Sign
                            up for our customers.</Link>
                    </div>
                </div>
                <div className="card">
                    <i className="custom-icon card-img-top fa fa-users fa-8x"/>
                    <div className="card-body">
                        <Link to='/registration/service' className="btn btn-info btn-lg btn-block">Sign
                            up for our service.</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUpMainSection;
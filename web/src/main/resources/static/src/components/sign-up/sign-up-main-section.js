import React from 'react';
import {Link} from 'react-router-dom';
import './sign-up.css';

const SignUpMainSection = () => {

    return (
        <div className="container signup-component">
            <div className="overlay"/>
            <div className="registration-mode">
                <Link to='/registration/customer' className="btn btn-info btn-lg">Sign up for our customers</Link>
            </div>
        </div>
    )
};

export default SignUpMainSection;
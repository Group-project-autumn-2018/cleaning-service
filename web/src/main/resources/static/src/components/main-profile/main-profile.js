import React from 'react';
import {connect} from 'react-redux';
import ServiceProfileForm from '../service-profile/profile-form';
import CustomerProfileForm from '../customers-profile-form/profile-form';

const MainProfile = (props) => {
    return props.role === 'service' ? <ServiceProfileForm/> : <CustomerProfileForm/>;
};

const mapStateToProps = (state) => {
    return {
        role: state.user.role[0]
    }
};

export default connect(mapStateToProps)(MainProfile);
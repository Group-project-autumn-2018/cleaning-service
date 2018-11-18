import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChangePassword from '../customers-profile-form/change-password'
import MaskedInput, {conformToMask} from 'react-text-mask';
import '../customers-profile-form/profile-form.css';
import {updateService} from '../actions/service-actions';
import {fetchEntity} from '../api/api-actions';
import './service-profile.css';
import OpenStreetMapApi from "../services/openstreetmap-api";
import DropdownAddressList from './dropdown-address-list';


class ProfileForm extends Component {
    openStreetMapApi = new OpenStreetMapApi();

    state = {
        logo: '',
        modeToggle: 'main',
        service: {
            username: '',
            address: '',
            phone: ''
        },
        phoneNumberMask: ['+', /[0-9]/, /\d/, /\d/, '(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,
            '-', /\d/, /\d/],
        passwordMatch: true,
        newPassword: '',
        addresses: []
    };

    componentDidMount() {
        fetchEntity(this.props.serviceId, "/cleaning", this.props.token)
            .then((service) => {
                this.setState({service: service})
            });
    };

    submitHandler = (e) => {
        e.preventDefault();
        console.log("submit");
        this.props.updateService(this.state.service, this.props.token);

    };

    onChangeHandler = (e) => {
        const name = e.target.name;
        //console.log(e.target.value);
        const updatedService = {
            ...this.state.service,
            [name]: name === "cleaningNotifications" ? e.target.checked : e.target.value
        };
        this.setState({service: updatedService});
        if (name === 'address' && e.target.value.length > 5) {
            this.openStreetMapApi.getAddress(e.target.value).then(response => this.setState({addresses: response}));
        }
    };

    onChangeLogoHandler = (event) => {
        this.setState({logo: event.target.files[0]});
    };

    onClickAddressHandler = (event) => {
        const address = this.state.addresses.find(address => address.place_id === event.target.id);
        const updatedService = {
            ...this.state.service,
            lat: address.lat,
            lon: address.lon
        };
        console.log(address.lat + ' ' + address.lon);
        this.setState({service: updatedService, addresses: []});
    };

    checkPasswordMatch = (e) => {
        const name = e.target.name;
        console.log(e.target.value);
        console.log(e.target.name);
        this.setState({[name]: e.target.value});
        if (name === 'confPassword') {
            this.setState({passwordMatch: e.target.value === this.state.newPassword});
        }
    };

    changeModeToggle = (event) => {
        event.preventDefault();
        this.setState({modeToggle: event.target.name});
        console.log(event.target.name);
    };

    render() {
        return (
            <div className="profile-form-container">
                <form className="container profile-form" onSubmit={this.submitHandler}>
                    <h3 className="text-center"> My profile</h3>
                    <nav>
                        <div className="nav nav-tabs service-tabs" role="tablist">
                            <button className={`nav-item nav-link ${this.state.modeToggle === 'main' ? 'active' : ''}`}
                                    data-toggle="tab" role="tab" aria-selected="true"
                                    name="main" onClick={this.changeModeToggle}>
                                Main info
                            </button>
                            <button
                                className={`nav-item nav-link ${this.state.modeToggle === 'security' ? 'active' : ''}`}
                                data-toggle="tab" role="tab" aria-selected="false"
                                name="security" onClick={this.changeModeToggle}>
                                Security
                            </button>
                            <button className={`nav-item nav-link ${this.state.modeToggle === 'other' ? 'active' : ''}`}
                                    data-toggle="tab" role="tab" aria-selected="false"
                                    name="other" onClick={this.changeModeToggle}>
                                Other settings
                            </button>
                        </div>
                    </nav>
                    {this.state.modeToggle === 'main' ?
                        <MainPanel {...this.state} onChangeHandler={this.onChangeHandler}
                                   onChangeLogoHandler={this.onChangeLogoHandler}
                                   onClickAddressHandler={this.onClickAddressHandler}/> : null}
                    {this.state.modeToggle === 'security' ? <ChangePassword passwordMatch={this.state.passwordMatch}
                                                                            checkPasswordMatch={this.checkPasswordMatch}/> : null}
                    {this.state.modeToggle === 'other' ? <OtherPanel/> : null}
                    <div className="text-center">
                        <button type="submit" className="btn btn-lg btn-primary col-sm-4 ">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

const MainPanel = (props) => {
    return (
        <React.Fragment>
            <div className="form-group row">
                <label htmlFor="profileFormLogo" className="col-sm-4 col-form-label">Logo</label>
                <div className="custom-file col-sm-5 profile-service-input">
                    <input type="file" className="custom-file-input" id="inputGroupFile01"
                           onChange={props.onChangeLogoHandler} aria-describedby="inputGroupFileAddon01"/>
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        {props.logo !== '' ? props.logo.name : "Choose file"}</label>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormName" className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="profileFormName" placeholder="Name"
                           name="username"
                           value={props.service.username}
                           onChange={props.onChangeHandler}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormEmail" className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                    <input type="email" className="form-control" id="profileFormEmail" placeholder="Email"
                           name="email"
                           value={props.service.email}
                           onChange={props.onChangeHandler}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormPhone" className="col-sm-4 col-form-label">Phone</label>
                <div className="col-sm-8">
                    <MaskedInput
                        mask={props.phoneNumberMask}
                        className="form-control"
                        placeholder="375(__)___-____"
                        guide={false}
                        id="profileFormPhone"
                        name="phone"
                        value={conformToMask(props.service.phone ? props.service.phone : "",
                            props.phoneNumberMask, {guide: false}).conformedValue}
                        onChange={props.onChangeHandler}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormAddress" className="col-sm-4 col-form-label">Address</label>
                <div className="col-sm-8 dropdown">
                    <input type="text" className="form-control dropdown-toggle" id="profileFormAddress"
                           data-toggle="dropdown" placeholder="Address"
                           name="address"
                           value={props.service.address}
                           onChange={props.onChangeHandler}
                    />
                    <DropdownAddressList array={props.addresses} onClickHandler={props.onClickAddressHandler}/>
                </div>
            </div>

            <div className="form-check text-center">
                <input className="form-check-input" type="checkbox" id="gridCheck1"
                       name="cleaningNotifications"
                       checked={props.service.cleaningNotifications}
                       onChange={props.onChangeHandler}/>
                <label className="form-check-label" htmlFor="gridCheck1">
                    Remind me about cleaning
                </label>
            </div>
        </React.Fragment>
    )
};

const OtherPanel = () => {
    return (
        <p>Hello</p>
    )
};


const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        serviceId: state.user.id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateService: (serviceId, token) => {
            dispatch(updateService(serviceId, token))
        }
    }
};

const AdditionalInput = (props) => {
    return (
        <React.Fragment>
            <input type="text" className="form-control" placeholder={props.placeholders[0]}
                   name={props.names[0]} onChange={props.onChangeHandler}/>
            <input type="text" className="form-control" placeholder={props.placeholders[1]}
                   name={props.names[1]} onChange={props.onChangeHandler}/>
        </React.Fragment>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);




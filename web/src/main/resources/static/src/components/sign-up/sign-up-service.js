import React, {Component} from 'react';
import './sign-up.css';

import ServiceApi from '../services/service-api';
import VerificationForm from './verification-form';
import CleaningTypesForm from '../service-profile/cleaning-types-form';
import LoginForm from "./login-form";
import DropdownAddressList from "../service-profile/dropdown-address-list";
import OpenStreetMapApi from "../services/openstreetmap-api";
import * as actions from "../actions/auth-actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class SignUpService extends Component {
    serviceApi = new ServiceApi();
    openStreetMapApi = new OpenStreetMapApi();

    constructor(props){
        super(props);
        this.state = {
            disabled: false,
            confirmPassword: '',
            tempAddress: '',
            avatar: '',
            logo: '',
            code: '',
            verificationStatus: false,
            service: {
                description: '',
                username: '',
                address: {
                    address: '',
                    lat: 0,
                    lon: 0
                },
                email: '',
                phone: '',
                password: '',
                cleaningTypes: {
                    standardRoomCleaning: true,
                    springCleaning: false,
                    repairAndConstructionCleaning: false,
                    dryCarpetCleaning: false,
                    officeCleaning: false,
                    furnitureAndCoatingsCleaning: false,
                    industrialCleaning: false,
                    poolCleaning: false,
                    price: {
                        basePrice: null,
                        standardRoomCleaning: null,
                        springCleaning: null,
                        repairAndConstructionCleaning: null,
                        dryCarpetCleaning: null,
                        officeCleaning: null,
                        furnitureAndCoatingsCleaning: null,
                        industrialCleaning: null,
                        poolCleaning: null,
                        smallRoom: null,
                        bigRoom: null,
                        bathroom: null
                    },
                    cleaningTime: {
                        standardRoomCleaningTime: null,
                        springCleaningTime: null,
                        repairAndConstructionCleaningTime: null,
                        dryCarpetCleaningTime: null,
                        officeCleaningTime: null,
                        furnitureAndCoatingsCleaningTime: null,
                        industrialCleaningTime: null,
                        poolCleaningTime: null,
                        smallRoomCleaningTime: null,
                        bigRoomCleaningTime: null,
                        bathroomCleaningTime: null
                    }
                },

            },
            message: '',
            modeToggle: 'security',
            addresses: []

        };
    }



    changeCode = (event) => {
        this.setState({code: event.target.value});
        if (event.target.value.length !== 6) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    changeUsername = (event) => {
        const updatedService = {
            ...this.state.service,
            username: event.target.value
        };
        this.setState({service: updatedService});
        if (event.target.value.length < 3) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    changeEmail = (event) => {

        const updatedService = {
            ...this.state.service,
            email: event.target.value
        };
        this.setState({service: updatedService});
    };

    changePhone = (event) => {
        const updatedService = {
            ...this.state.service,
            phone: event.target.value
        };
        this.setState({service: updatedService});
        if (event.target.value.length < 18) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    changePassword = (event) => {
        const updatedService = {
            ...this.state.service,
            password: event.target.value
        };
        this.setState({service: updatedService});
    };

    changePasswordConfirm = (event) => {
        this.setState({confirmPassword: event.target.value});
        if (event.target.value !== this.state.service.password) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    validate = () => {
        if (this.state.service.password !== this.state.confirmPassword
            || this.state.service.password.length < 3) {
            return false;
        }
        if (this.state.service.username.length < 3) {
            return false;
        }
        return !(this.state.service.email === '' && this.state.service.phone === '+375');
    };


    preRegister = () => {
        if (this.validate()) {
            this.setState({disabled: true});

            const objDto = {...this.state.service};

            let formData = new FormData();
            formData.append("objDto", JSON.stringify(objDto));
            if (this.state.logo !== '') formData.append("logotype", this.state.logo);
            console.log(formData);
            this.serviceApi.registerServiceMultipart(formData).then(resp => {
                if (resp !== 202) {
                    this.setState({disabled: false});
                }
            });
        } else {
            console.log("false pre reg");
        }
    };

    verify = () => {
        const token = this.state.service.username + this.state.service.password;

        const obj = {
            code: this.state.code,
            encodedString: this.base64EncodeUnicode(token)
        };
        this.serviceApi.verifyService(obj).then(status => {
            switch (status) {
                case 201:
                    this.setState({verificationStatus: true});
                    let login;
                    if (this.state.service.email === '') {
                        login = this.state.service.phone;
                    } else {
                        login = this.state.service.email;
                    }
                    let password = this.state.service.password;
                    this.props.fetchAccessToken(login, password);
                    break;
                case 423:
                    this.setState({
                        disabled: false,
                        message: 'Credentials has been deleted, you need to re-register'
                    });
                    break;
                case 406:
                    this.setState({
                        message: 'Wrong verification code'
                    });
            }
        });
    };

    base64EncodeUnicode = (str) => {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    };


    // openAvatar = (event) => {
    //     let input = event.target;
    //     this.setState({logotype: input.files[0]});
    //     let fileReader = new FileReader();
    //     fileReader.readAsDataURL(input.files[0]);
    //     fileReader.onload = () => {
    //         this.setState({avatar: fileReader.result});
    //     }
    // };

    submitHandler = (e) => {
        e.preventDefault();
        this.props.updateService(this.state.service, this.props.token);
    };

    onChangeHandler = (e) => {
        const name = e.target.name;
        const updatedService = {
            ...this.state.service,
            [name]: name === "cleaningNotifications" ? e.target.checked : e.target.value
        };
        this.setState({service: updatedService});
        if (name === 'address') {
            this.setState({tempAddress: e.target.value});
            this.openStreetMapApi.getAddress(e.target.value).then(response => this.setState({addresses: response}));
        }
    };

    onChangeLogoHandler = (event) => {
        this.setState({logo: event.target.files[0]});
    };

    onClickAddressHandler = (event) => {
        const address = this.state.addresses.find(address => address.place_id === event.target.id);
        const updatedAddress = {
            address: this.state.tempAddress,
            lat: address.lat,
            lon: address.lon
        };
        const updatedService = {
            ...this.state.service,
            address: updatedAddress
        };
        console.log(address.lat + ' ' + address.lon);
        this.setState({service: updatedService, addresses: []});
    };

    onChangeTypeHandler = (event) => {
        const name = event.target.name;
        const updatedTypes = {
            ...this.state.service.cleaningTypes,
            [name]: event.target.checked
        };
        const updatedService = {
            ...this.state.service,
            cleaningTypes: updatedTypes
        };
        this.setState({service: updatedService});
    };

    onChangeTimeHandler = (event) => {
        const name = event.target.name;
        const updatedCleaningTimeDto = {
            ...this.state.service.cleaningTypes.cleaningTime,
            [name]: event.target.value
        };
        const updatedTypes = {
            ...this.state.service.cleaningTypes,
            cleaningTime: updatedCleaningTimeDto
        };
        const updatedService = {
            ...this.state.service,
            cleaningTypes: updatedTypes
        };
        this.setState({service: updatedService});
    };

    onChangePriceHandler = (event) => {
        const name = event.target.name;
        const updatedPriceDto = {
            ...this.state.service.cleaningTypes.price,
            [name]: event.target.value
        };
        const updatedTypes = {
            ...this.state.service.cleaningTypes,
            price: updatedPriceDto
        };
        const updatedService = {
            ...this.state.service,
            cleaningTypes: updatedTypes
        };
        this.setState({service: updatedService});
    };

    changeModeToggle = (event) => {
        event.preventDefault();
        this.setState({modeToggle: event.target.name});
        console.log(event.target.name);
    };

    componentDidUpdate = () => {
        if (this.props.isAuthenticated) {
            this.props.history.push("/profile");
        }
    };

    render() {
        return (
            <div className="container signup-component">
                <div className="overlay"/>
                <form>
                    <nav>
                        <div className="nav nav-tabs service-tabs" role="tablist">
                            <button
                                className={`nav-item nav-link ${this.state.modeToggle === 'security' ? 'active' : ''}`}
                                data-toggle="tab" role="tab" aria-selected="false"
                                name="security" onClick={this.changeModeToggle}>
                                Security
                            </button>
                            <button className={`nav-item nav-link ${this.state.modeToggle === 'main' ? 'active' : ''}`}
                                    data-toggle="tab" role="tab" aria-selected="true"
                                    name="main" onClick={this.changeModeToggle}>
                                Main info
                            </button>
                            <button className={`nav-item nav-link ${this.state.modeToggle === 'other' ? 'active' : ''}`}
                                    data-toggle="tab" role="tab" aria-selected="false"
                                    name="other" onClick={this.changeModeToggle}>
                                Other settings
                            </button>
                        </div>
                    </nav>

                    {this.state.modeToggle === 'security' ?
                        <LoginForm {...this.state}
                                   changeEmail={this.changeEmail}
                                   changePhone={this.changePhone}
                                   changePassword={this.changePassword}
                                   changePasswordConfirm={this.changePasswordConfirm}
                                   onChangeHandler={this.onChangeHandler}/>
                        : null}
                    {this.state.modeToggle === 'main' ?
                        <MainPanel {...this.state} onChangeHandler={this.onChangeHandler}
                                   onChangeLogoHandler={this.onChangeLogoHandler}
                                   onClickAddressHandler={this.onClickAddressHandler}/> : null}

                    {this.state.modeToggle === 'other' ?
                        <CleaningTypesForm {...this.state.service}
                                           onChangeTypeHandler={this.onChangeTypeHandler}
                                           onChangePriceHandler={this.onChangePriceHandler}
                                           onChangeTimeHandler={this.onChangeTimeHandler}
                        />
                        : null}


                    <div>
                        <button type="button" className="btn btn-primary btn-lg float-right"
                                onClick={this.preRegister} disabled={this.state.disabled}>
                            Sign up !
                        </button>
                    </div>
                    <span>{this.state.message}</span>
                    {this.state.disabled ? <VerificationForm code={this.state.code} changeCode={this.changeCode}
                                                             verify={this.verify}
                                                             verificationStatus={this.state.verificationStatus}/> : ''}
                </form>
            </div>
        );
    };
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
                <label htmlFor="profileFormName" className="col-sm-4 col-form-label">Description</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control input-left-space col-sm-6" id="profileFormDescription"
                           placeholder="Description"
                           name="description"
                           value={props.service.description}
                           onChange={props.onChangeHandler}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormAddress" className="col-sm-4 col-form-label">Address</label>
                <div className="col-sm-8 dropdown">
                    <input type="text" className="form-control dropdown-toggle input-left-space col-sm-6"
                           id="profileFormAddress"
                           data-toggle="dropdown" placeholder="Address"
                           name="address"
                           value={props.tempAddress}
                           onChange={props.onChangeHandler}
                    />
                    <DropdownAddressList array={props.addresses} onClickHandler={props.onClickAddressHandler}/>
                </div>
            </div>

        </React.Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccessToken: (login, password) => {
            dispatch(actions.fetchAccessToken(login, password));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpService));

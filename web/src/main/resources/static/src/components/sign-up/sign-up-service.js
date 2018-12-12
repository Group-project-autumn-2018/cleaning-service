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

    constructor(props) {
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
                    standardRoomCleaning: false,
                    springCleaning: false,
                    repairAndConstructionCleaning: false,
                    dryCarpetCleaning: false,
                    officeCleaning: false,
                    furnitureAndCoatingsCleaning: false,
                    industrialCleaning: false,
                    poolCleaning: false,
                    price: {
                        basePrice: 0,
                        standardRoomCleaning: 0,
                        springCleaning: 0,
                        repairAndConstructionCleaning: 0,
                        dryCarpetCleaning: 0,
                        officeCleaning: 0,
                        furnitureAndCoatingsCleaning: 0,
                        industrialCleaning: 0,
                        poolCleaning: 0,
                        smallRoom: 0,
                        bigRoom: 0,
                        bathroom: 0
                    },
                    cleaningTime: {
                        standardRoomCleaningTime: 0,
                        springCleaningTime: 0,
                        repairAndConstructionCleaningTime: 0,
                        dryCarpetCleaningTime: 0,
                        officeCleaningTime: 0,
                        furnitureAndCoatingsCleaningTime: 0,
                        industrialCleaningTime: 0,
                        poolCleaningTime: 0,
                        smallRoomCleaningTime: 0,
                        bigRoomCleaningTime: 0,
                        bathroomCleaningTime: 0
                    }
                },

            },
            message: '',
            modeToggle: 'security',
            addresses: [],
            basePriceError: false,
            dryCarpetCleaningError: false,
            furnitureAndCoatingsCleaningError: false,
            industrialCleaningError: false,
            officeCleaningError: false,
            poolCleaningError: false,
            repairAndConstructionCleaningError: false,
            springCleaningError: false,
            standardRoomCleaningError: false,
            passwordMatchError: false,
            passwordLengthError: false,
            usernameError: false,
            emailFormatError: false,
            emailError: false,
            addressError: false,
            emailDuplicateError: false
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

    /*changeUsername = (event) => {
        const updatedService = {
            ...this.state.service,
            username: event.target.value
        };
        this.setState({service: updatedService});

    };*/

    changeEmail = (event) => {
        const updatedService = {
            ...this.state.service,
            email: event.target.value
        };
        if (event.target.value.length >= 6) {
            this.serviceApi.isEmailExists(event.target.value)
                .then(response => {
                    this.setState({emailDuplicateError: response});
                });
        }
        this.setState({service: updatedService});
        this.validateLength(6, 50, event.target);
        if (!this.state.emailError) this.validateEmail(event.target);
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
        if (event.target.value.length < 6 || event.target.value.length > 30) {
            this.setState({passwordLengthError: true});
            event.target.classList.add('invalid');
        } else {
            this.setState({passwordLengthError: false});
            event.target.classList.remove('invalid');
        }
    };

    changePasswordConfirm = (event) => {
        this.setState({confirmPassword: event.target.value});
        if (event.target.value !== this.state.service.password) {
            event.target.classList.add('invalid');
            this.setState({passwordMatchError: true});
        } else {
            event.target.classList.remove('invalid');
            this.setState({passwordMatchError: false});
        }
    };

    validateLength(firstBoundary, lastBoundary, target) {
        if (target.value.length < firstBoundary || target.value.length > lastBoundary) {
            target.classList.add('invalid');
            this.setState({[target.name + 'Error']: true});
        } else {
            target.classList.remove('invalid');
            this.setState({[target.name + 'Error']: false});
        }
    }

    validateEmail(target) {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(target.value)) {
            target.classList.remove('invalid');
            this.setState({emailFormatError: false});
        } else {
            target.classList.add('invalid');
            this.setState({emailFormatError: true});
        }
    }

    validate = () => {
        if (this.state.passwordLengthError || this.state.passwordMatchError || this.state.usernameError ||
            this.state.addressError || this.state.emailFormatError || this.emailError ||
            this.state.emailDuplicateError) {
            return false;
        }
        return !(this.state.service.email === '' && this.state.service.phone === '' ||
            this.state.service.username === '' || this.state.service.password === '');
    };


    preRegister = () => {
        if (this.validate() && this.validateCleaningTypes()) {
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

    validateCleaningType(cleaningTypes, typeName) {
        const cleaningTime = cleaningTypes.cleaningTime[typeName + 'Time'];
        const cleaningPrice = cleaningTypes.price[typeName];
        if (cleaningTypes[typeName]) {
            if (cleaningTime == null || +cleaningTime < 0 || cleaningTime.toString().length > 9 ||
                cleaningPrice == null || +cleaningPrice < 0 || cleaningPrice.toString().length > 15) {
                this.setState({[typeName + 'Error']: true});
                return false
            } else {
                if (this.state[typeName + 'Error']) {
                    this.setState({[typeName + 'Error']: false});
                }
                return true;
            }
        } else {
            if (this.state[typeName + 'Error']) this.setState({[typeName + 'Error']: false});
            return true;
        }
    }

    validateCleaningTypes() {
        const basePrice = this.state.service.cleaningTypes.price.basePrice;
        if (basePrice == null || +basePrice < 0 || basePrice.toString().length > 20) {
            this.setState({basePriceError: true});
            console.log("adding base price error");
            return false;
        } else {
            if (this.state.basePriceError) this.setState({basePriceError: false});
            return this.validateCleaningType(this.state.service.cleaningTypes, 'dryCarpetCleaning') &&
                this.validateCleaningType(this.state.service.cleaningTypes, 'furnitureAndCoatingsCleaning') &&
                this.validateCleaningType(this.state.service.cleaningTypes, 'industrialCleaning') &&
                this.validateCleaningType(this.state.service.cleaningTypes, 'officeCleaning') &&
                this.validateCleaningType(this.state.service.cleaningTypes, 'poolCleaning') &&
                this.validateCleaningType(this.state.service.cleaningTypes, 'repairAndConstructionCleaning') &&
                this.validateCleaningType(this.state.service.cleaningTypes, 'springCleaning') &&
                this.validateCleaningType(this.state.service.cleaningTypes, 'standardRoomCleaning');
        }
    }

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
            this.validateLength(4, 100, event.target);
            this.openStreetMapApi.getAddress(e.target.value).then(response => this.setState({addresses: response}));
        } else if (name === "username") {
            this.validateLength(2, 50, event.target);
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
            [name]: +event.target.value
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
            [name]: +event.target.value
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
        let {
            basePriceError, dryCarpetCleaningError, furnitureAndCoatingsCleaningError,
            industrialCleaningError, officeCleaningError, poolCleaningError, repairAndConstructionCleaningError,
            springCleaningError, standardRoomCleaningError
        } = this.state;
        let cleaningTypesErrors = {
            basePriceError, dryCarpetCleaningError, furnitureAndCoatingsCleaningError,
            industrialCleaningError, officeCleaningError, poolCleaningError, repairAndConstructionCleaningError,
            springCleaningError, standardRoomCleaningError
        };
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
                                           errors={cleaningTypesErrors}
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
                    <input type="text" className="form-control label-left-space col-sm-6" maxLength={255}
                           placeholder="Description" name="description" value={props.service.description}
                           onChange={props.onChangeHandler}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormAddress" className="col-sm-4 col-form-label">Address</label>
                <div className="col-sm-8 dropdown">
                    <input type="text" className="form-control dropdown-toggle label-left-space col-sm-6"
                           id="profileFormAddress" data-toggle="dropdown" placeholder="Address"
                           name="address" value={props.tempAddress} onChange={props.onChangeHandler}/>
                    <p className="errorMessage">Address size must be of 4 to 100</p>
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

import React, {Component} from 'react';
import './sign-up.css';
import '../service-profile/service-profile.css';
import ServiceApi from '../services/service-api';
import VerificationForm from './verification-form';
import CleaningTypesForm from '../service-profile/cleaning-types-form';
import LoginForm from "./login-form";
import DropdownAddressList from "../service-profile/dropdown-address-list";
import {updateService} from "../actions/service-actions";

class SignUpService extends Component {
    serviceApi = new ServiceApi();

    state = {
        avatar: '',
        logo: '',
        code: '',
        verificationStatus: false,
        service: {
            description: '',
            username: '',
            address: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            disabled: false,


            cleaningTypesDto: {
                standardRoomCleaning: true,
                springCleaning: false,
                repairAndConstructionCleaning: false,
                dryCarpetCleaning: false,
                officeCleaning: false,
                furnitureAndCoatingsCleaning: false,
                industrialCleaning: false,
                poolCleaning: false,
                priceDto: {
                    basePrice: 0,
                    standardRoomCleaning: 1,
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
                cleaningTimeDto: {
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
        addresses: []

    };

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
        const updatedService = {
            ...this.state.service,
            confirmPassword: event.target.value
        };
        this.setState({service: updatedService});
        if (event.target.value !== this.state.service.password) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    validate = () => {
        if (this.state.service.password !== this.state.service.confirmPassword
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
            const updatedService = {
                ...this.state.service,
                disabled: true
            };
            this.setState({service: updatedService});

            const objDto = {
                    username: this.state.service.username,
                    phone: this.state.service.phone,
                    email: this.state.service.email,
                    password: this.state.service.password,
                    description: this.state.service.description,
                    address: {
                        address: '',  //this.state.service.address,
                        lat: '',      //this.state.service.lat,
                        lon: ''       //this.state.service.lon
                    },
                    cleaningTypesDto: {
                        ...this.state.service.cleaningTypesDto
                    }
                }
            ;

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

    onChangeTypeHandler = (event) => {
        const name = event.target.name;
        const updatedTypes = {
            ...this.state.service.cleaningTypesDto,
            [name]: event.target.checked
        };
        const updatedService = {
            ...this.state.service,
            cleaningTypesDto: updatedTypes
        };
        this.setState({service: updatedService});
    };

    onChangeTimeHandler = (event) => {
        const name = event.target.name;
        const updatedCleaningTimeDto = {
            ...this.state.service.cleaningTypesDto.cleaningTimeDto,
            [name]: event.target.value
        };
        const updatedTypes = {
            ...this.state.service.cleaningTypesDto,
            cleaningTimeDto: updatedCleaningTimeDto
        };
        const updatedService = {
            ...this.state.service,
            cleaningTypesDto: updatedTypes
        };
        this.setState({service: updatedService});
    };

    onChangePriceHandler = (event) => {
        const name = event.target.name;
        const updatedPriceDto = {
            ...this.state.service.cleaningTypesDto.priceDto,
            [name]: event.target.value
        };
        const updatedTypes = {
            ...this.state.service.cleaningTypesDto,
            priceDto: updatedPriceDto
        };
        const updatedService = {
            ...this.state.service,
            cleaningTypesDto: updatedTypes
        };
        this.setState({service: updatedService});
    };

    changeModeToggle = (event) => {
        event.preventDefault();
        this.setState({modeToggle: event.target.name});
        console.log(event.target.name);
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
                        <LoginForm {...this.state.service}
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
                                onClick={this.preRegister} disabled={this.state.service.disabled}>
                            Sign up !
                        </button>
                    </div>
                    <span>{this.state.message}</span>
                    {this.state.service.disabled ? <VerificationForm code={this.state.code} changeCode={this.changeCode}
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
                    <input type="text" className="form-control" id="profileFormDescription" placeholder="Description"
                           name="description"
                           value={props.service.description}
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
        </React.Fragment>
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

export default SignUpService;
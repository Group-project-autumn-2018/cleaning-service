import React, {Component} from 'react';
import ChangePassword from '../customers-profile-form/change-password'
import '../customers-profile-form/profile-form.css';
import {updateService} from '../actions/service-actions';
import './service-profile.css';
import OpenStreetMapApi from "../services/openstreetmap-api";
import CleaningTypesForm from './cleaning-types-form';
import {connect} from "react-redux";
import {fetchEntity} from "../api/api-actions";
import MainPanel from './main-panel';
import {connectWs} from '../actions/notification-actions';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeedbackList from "../service-info/feedback-list";


class ProfileForm extends Component {
    openStreetMapApi = new OpenStreetMapApi();

    constructor(props) {
        super(props);
        this.state = {
            tempAddress: '',
            logo: '',
            modeToggle: 'main',
            service: {
                id: '',
                newPassword: '',
                username: '',
                email: '',
                address: {
                    address: '',
                    lat: 0,
                    lon: 0
                },
                phone: '',
                cleaningTypes: {}
            },
            phoneNumberMask: ['+', /[0-9]/, /\d/, /\d/, '(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,
                '-', /\d/, /\d/],
            passwordMatch: true,
            confPassword: '',
            addresses: [],
            success: false,
            passwordError: false,
            newPasswordError: false,
            confirmPasswordDelete: false,
            feedbackList: [],
            isMoreThanFiveFeedback: false,
            usernameError: false,
            addressError: false,
            emailError: false,
            isEmailIncorrect: false,
            basePriceError: false,
            dryCarpetCleaningError: false,
            furnitureAndCoatingsCleaningError: false,
            industrialCleaningError: false,
            officeCleaningError: false,
            poolCleaningError: false,
            repairAndConstructionCleaningError: false,
            springCleaningError: false,
            standardRoomCleaningError: false
        };
    }

    componentDidMount() {
        this.props.connectWs(this.props.token);
        fetchEntity(this.props.serviceId, "/cleaning", this.props.token)
            .then((service) => {
                this.setState({service: service, tempAddress: service.address.address})
            });
    };

    testNo = () => {
        fetch("/api/order/test?access_token=" + this.props.token);
    };

    onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'password') {
            if (value.length < 6 || value.length > 30) {
                e.target.classList.add('invalid');
                this.setState({passwordError: true})
            } else {
                e.target.classList.remove('invalid');
                this.setState({passwordError: false})
            }
        }
        const updatedService = {
            ...this.state.service,
            [name]: name === "cleaningNotifications" ? e.target.checked : value
        };
        this.setState({service: updatedService, success: false});
        if (name === 'address') {
            this.setState({tempAddress: value});
            this.openStreetMapApi.getAddress(value).then(response => this.setState({addresses: response}));
        }
        this.formValidation(e);
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
            this.setState({isEmailIncorrect: false});
        } else {
            target.classList.add('invalid');
            this.setState({isEmailIncorrect: true});
        }
    }

    formValidation(event) {
        const name = event.target.name;
        switch (name) {
            case "username":
                this.validateLength(2, 50, event.target);
                break;
            case "email":
                this.validateLength(6, 30, event.target);
                this.validateEmail(event.target);
                break;
            case "address":
                this.validateLength(4, 100, event.target);
                break;
        }
    }

    validateCleaningType(cleaningTypes, typeName) {
        if (cleaningTypes[typeName]) {
            if (cleaningTypes.cleaningTime[typeName + 'Time'] == null ||
                +cleaningTypes.cleaningTime[typeName + 'Time'] < 0 ||
                cleaningTypes.price[typeName] == null || +cleaningTypes.price[typeName] < 0) {
                this.setState({[typeName + 'Error']: true});
                return false
            } else {
                if (this.state[typeName + 'Error']) {
                    this.setState({[typeName + 'Error']: false});
                    console.log([typeName + 'Error'] + " setting false");
                } else console.log([typeName + 'Error'] + " dont setting false");
                return true;
            }
        } else {
            if (this.state[typeName + 'Error']) this.setState({[typeName + 'Error']: false});
            return true;
        }
    }

    validateCleaningTypes() {
        if (this.state.service.cleaningTypes.price.basePrice == null ||
            +this.state.service.cleaningTypes.price.basePrice < 0) {
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


    checkPasswordMatch = (e) => {
        const name = e.target.name;
        const password = e.target.value;
        if (name === 'confPassword') {
            this.setState({
                passwordMatch: password === this.state.service.newPassword,
                passwordError: !(password === this.state.service.newPassword),
                confPassword: password
            });
        } else {
            this.setState({service: {...this.state.service, [name]: password}});
            if (this.state.confPassword) {
                this.setState({
                    passwordMatch: password === this.state.confPassword,
                    passwordError: !(password === this.state.confPassword)
                });
            }
            if (password.length < 6 || password.length > 30) {
                e.target.classList.add('invalid');
                this.setState({passwordError: true, newPasswordError: true})
            } else {
                e.target.classList.remove('invalid');
                this.setState({passwordError: false, newPasswordError: false})
            }
        }

    };

    changeModeToggle = (event) => {
        event.preventDefault();
        if (event.target.name === 'feedback') {
            fetchEntity('feedback?count=6&service-id=' + this.props.serviceId, "/cleaning", this.props.token)
                .then((list) => {
                    let trigger = false;
                    if (list.length > 5) {
                        list.pop();
                        trigger = true;
                    }
                    this.setState({feedbackList: list, isMoreThanFiveFeedback: trigger})
                });
        }
        this.setState({modeToggle: event.target.name});
        console.log(event.target.name);
    };

    saveService = (event) => {
        event.preventDefault();
        console.log(this.state);
        if (!this.state.usernameError && !this.state.emailError && !this.state.addressError &&
            !this.state.isEmailIncorrect && this.validateCleaningTypes()) {
            const service = {
                ...this.state.service,
                password: this.state.service.newPassword
            };
            const entity = new FormData();
            if (this.state.logo !== '') {
                entity.append('logo', this.state.logo, this.state.logo.name);
            }
            const serviceJson = JSON.stringify(service);
            entity.append('company', serviceJson);
            this.props.updateService(entity, this.props.token, this.state.service.id);
            this.setState({
                success: true
            });
        }
    };

    downloadAllFeedback = () => {
        fetchEntity('feedback?service-id=' + this.props.serviceId, "/cleaning", this.props.token)
            .then((list) => {
                this.setState({feedbackList: list, isMoreThanFiveFeedback: false})
            });
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
            <div className="profile-form-container">
                <form className="container profile-form" onSubmit={this.submitHandler}>
                    <h4 className="text-center"> My profile</h4>
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
                            <button
                                className={`nav-item nav-link ${this.state.modeToggle === 'feedback' ? 'active' : ''}`}
                                data-toggle="tab" role="tab" aria-selected="true"
                                name="feedback" onClick={this.changeModeToggle}>
                                Feedback
                            </button>
                        </div>
                    </nav>
                    {this.state.modeToggle === 'main' ?
                        <MainPanel {...this.state} onChangeHandler={this.onChangeHandler}
                                   onChangeLogoHandler={this.onChangeLogoHandler}
                                   onClickAddressHandler={this.onClickAddressHandler}/> : null}
                    {this.state.modeToggle === 'security' ? <ChangePassword passwordMatch={this.state.passwordMatch}
                                                                            updatePassword={this.onChangeHandler}
                                                                            checkPasswordMatch={this.checkPasswordMatch}
                                                                            newPasswordError={this.state.newPasswordError}/> : null}
                    {this.state.modeToggle === 'other' ?
                        <CleaningTypesForm {...this.state.service}
                                           errors={cleaningTypesErrors}
                                           onChangeTypeHandler={this.onChangeTypeHandler}
                                           onChangePriceHandler={this.onChangePriceHandler}
                                           onChangeTimeHandler={this.onChangeTimeHandler}/> : null}
                    {this.state.modeToggle === 'feedback' ?
                        <FeedbackPanel feedbackList={this.state.feedbackList}
                                       isMoreThanFiveFeedback={this.state.isMoreThanFiveFeedback}
                                       downloadAllFeedback={this.downloadAllFeedback}/> : null}
                    <div className="text-center">
                        {this.state.success ? <p className="success"><i className="fa fa-check"/>Updated</p> :
                            <button type="submit" className="btn btn-lg btn-primary col-sm-4"
                                    onClick={this.saveService}>
                                Save
                            </button>}
                    </div>
                </form>
                <button className="btn btn-primary" onClick={this.testNo}>Test</button>
                <ToastContainer autoClose={false} toastClassName='toast-container' position="bottom-right"/>
            </div>
        )
    }
}

const FeedbackPanel = (props) => {
    return (
        <React.Fragment>
            <FeedbackList array={props.feedbackList}/>
            {props.isMoreThanFiveFeedback ?
                <button type="button" className="btn btn-lg btn-primary col-sm-4" onClick={props.downloadAllFeedback}>
                    Download more
                </button> : null}
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
        updateService: (service, token, id) => {
            dispatch(updateService(service, token, id))
        },
        connectWs: (token) => {
            dispatch(connectWs(token))
        }
    }
};

//export default ProfileForm;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);




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


class ProfileForm extends Component {
    openStreetMapApi = new OpenStreetMapApi();

    constructor(props) {
        super(props);
        this.state = {
            logo: '',
            modeToggle: 'main',
            service: {
                id: '',
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
            newPassword: '',
            addresses: []
        };
    }

    componentDidMount() {
        fetchEntity(this.props.serviceId, "/cleaning", this.props.token)
            .then((service) => {
                this.setState({service: service})
            });
    };

    onChangeHandler = (e) => {
        const name = e.target.name;
        const updatedService = {
            ...this.state.service,
            [name]: name === "cleaningNotifications" ? e.target.checked : e.target.value
        };
        this.setState({service: updatedService});
        if (name === 'address' && e.target.value.length > 5) {
            const updatedAddress = {
                ...this.state.service.address,
                address: e.target.value
            };
            const updatedService = {
                ...this.state.service,
                address: updatedAddress
            };
            this.setState({service: updatedService});
            this.openStreetMapApi.getAddress(e.target.value).then(response => this.setState({addresses: response}));
        }
    };

    onChangeLogoHandler = (event) => {
        this.setState({logo: event.target.files[0]});
    };

    onClickAddressHandler = (event) => {
        const address = this.state.addresses.find(address => address.place_id === event.target.id);
        const updatedAddress = {
            ...this.state.service.address,
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

    saveService = (event) => {
        event.preventDefault();
        console.log(this.state);
        const entity = new FormData();
        if (this.state.logo !== '') {
            entity.append('logo', this.state.logo, this.state.logo.name);
        }
        const serviceJson = JSON.stringify(this.state.service);
        entity.append('company', serviceJson);
        this.props.updateService(entity, this.props.token, this.state.service.id);
    };

    render() {
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
                        </div>
                    </nav>
                    {this.state.modeToggle === 'main' ?
                        <MainPanel {...this.state} onChangeHandler={this.onChangeHandler}
                                   onChangeLogoHandler={this.onChangeLogoHandler}
                                   onClickAddressHandler={this.onClickAddressHandler}/> : null}
                    {this.state.modeToggle === 'security' ? <ChangePassword passwordMatch={this.state.passwordMatch}
                                                                            checkPasswordMatch={this.checkPasswordMatch}/> : null}
                    {this.state.modeToggle === 'other' ?
                        <CleaningTypesForm {...this.state.service}
                                           onChangeTypeHandler={this.onChangeTypeHandler}
                                           onChangePriceHandler={this.onChangePriceHandler}
                                           onChangeTimeHandler={this.onChangeTimeHandler}
                        /> : null}
                    <div className="text-center">
                        <button type="submit" className="btn btn-lg btn-primary col-sm-4" onClick={this.saveService}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

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
        }
    }
};

//export default ProfileForm;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);




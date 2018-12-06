import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChangePassword from './change-password'
import MaskedInput, {conformToMask} from 'react-text-mask';
import './profile-form.css';
import {fetchEntity, fetchUpdateEntity} from '../api/api-actions';
import OpenStreetMapApi from "../services/openstreetmap-api";
import DropdownAddressList from "../service-profile/dropdown-address-list";


class ProfileForm extends Component {

    state = {
        URN: "/customer/profile",
        changePassword: false,
        customer: {
            address: {
                address: "",
                lat: "",
                lon: ""
            },
            phone: "",
        },
        addresses: [],
        phoneNumberMask: ['+', /[0-9]/, /\d/, /\d/, '(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
        passwordMatch: true,
        error: false,
        success: false,
        usernameError: false,
        emailError: false,
        addressError: false,
        passwordError: false,
        newPasswordError: false,
        confirmPasswordDelete: false
    };

    openStreetMapApi = new OpenStreetMapApi();


    componentDidMount() {
        fetchEntity(this.props.customerId, this.state.URN, this.props.token)
            .then((customer) => {
                this.setState({customer: customer})
            });
    };

    changePasswordToggle = () => {
        this.setState({
            changePassword: !this.state.changePassword
        });
        console.log(!this.state.changePassword)
    };

    submitHandler = (e) => {
        e.preventDefault();

        if (!this.state.usernameError && !this.state.emailError && !this.state.addressError && !this.state.passwordError) {
            fetchUpdateEntity(this.state.customer, this.state.URN, this.props.token).then(response => {
                if (response.status === 200) {
                    this.setState({
                        success: true, changePassword: false, confirmPassword: null,
                        customer: {...this.state.customer, password: null, newPassword: null}
                    })
                }
                if (response.status === 406) {
                    this.setState({error: true})
                }
            });
        }
    };

    onChangeHandler = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        switch (name) {
            case 'username':
                if (value.length < 2 || value.length > 50) {
                    e.target.classList.add('invalid');
                    this.setState({usernameError: true})
                } else {
                    e.target.classList.remove('invalid');
                    this.setState({usernameError: false})
                }
                break;
            case 'email':
                if (!/[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/.test(value)) {
                    e.target.classList.add('invalid');
                    this.setState({emailError: true})
                } else {
                    e.target.classList.remove('invalid');
                    this.setState({emailError: false})
                }
                break;
            case 'password':
                this.setState({error: false});
                if (value.length < 6 || value.length > 30) {
                    e.target.classList.add('invalid');
                    this.setState({passwordError: true})
                } else {
                    e.target.classList.remove('invalid');
                    this.setState({passwordError: false})
                }
                break;
            case 'address':
                if (value.length > 200) {
                    e.target.classList.add('invalid');
                    this.setState({addressError: true})
                } else {
                    e.target.classList.remove('invalid');
                    this.setState({addressError: false});
                    if (value.length > 5) {
                        console.log('opensm');
                        this.openStreetMapApi.getAddress(value).then(response => this.setState({addresses: response}));
                    }
                    value = {
                        ...this.state.customer.address,
                        address: value
                    };

                }
                break;
        }

        const updatedCustomer = {
            ...this.state.customer,
            [name]: name === "cleaningNotifications" ? e.target.checked : value
        };
        this.setState({customer: updatedCustomer, success: false})
    };

    onClickAddressHandler = (e) => {
        const address = this.state.addresses.find(address => address.place_id === e.target.id);
        const updatedCustomer = {
            ...this.state.customer,
            address: {...this.state.customer.address, lat: address.lat, lon: address.lon}
        };
        console.log(address.lat + ' ' + address.lon);
        this.setState({customer: updatedCustomer, addresses: []});
    };

    checkPasswordMatch = (e) => {
        const name = e.target.name;
        const password = e.target.value;
        if (name === 'confPassword') {
            this.setState({
                passwordMatch: password === this.state.customer.newPassword,
                passwordError: !(password === this.state.customer.newPassword),
                confPassword: password
            });
        } else {
            this.setState({customer: {...this.state.customer, [name]: password}});
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

    render() {
        return (
            <div className="profile-form-container">
                <form className="container profile-form" onSubmit={this.submitHandler}>
                    <h3 className="text-center"> My profile</h3>
                    <div className="form-group row">
                        <label htmlFor="profileFormName" className="col-sm-4 col-form-label">Name</label>
                        <div className="text-center col-sm-8">
                            <input type="text" className="form-control" id="profileFormName" placeholder="Name"
                                   name="username"
                                   value={this.state.customer.username}
                                   onChange={this.onChangeHandler}
                            />
                            <p className="errorMessage text-center">Username needs to be between 2 and 50 characters
                                long</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormEmail" className="col-sm-4 col-form-label">Email</label>
                        <div className="text-center col-sm-8">
                            <input type="email" className="form-control" id="profileFormEmail" placeholder="Email"
                                   name="email"
                                   value={this.state.customer.email}
                                   onChange={this.onChangeHandler}
                            />
                            <p className="errorMessage">Invalid email</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormPhone" className="col-sm-4 col-form-label">Phone</label>
                        <MaskedInput
                            mask={this.state.phoneNumberMask}
                            className="form-control col-sm-8"
                            placeholder="375(__)___-____"
                            guide={false}
                            id="profileFormPhone"
                            name="phone"
                            value={conformToMask(this.state.customer.phone ? this.state.customer.phone : "",
                                this.state.phoneNumberMask, {guide: false}).conformedValue}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormAddress" className="col-sm-4 col-form-label">Address</label>
                        <div className="text-center col-sm-8 dropdown">
                            <input type="text" className="form-control" id="profileFormAddress"
                                   placeholder="Address"
                                   name="address"
                                   value={this.state.customer.address.address}
                                   onChange={this.onChangeHandler}
                            />
                            <DropdownAddressList array={this.state.addresses}
                                                 onClickHandler={this.onClickAddressHandler}/>
                            <p className="errorMessage">Too long address</p>
                        </div>
                    </div>

                    <div className="form-check text-center">
                        <input className="form-check-input" type="checkbox" id="gridCheck1"
                               name="cleaningNotifications"
                               checked={this.state.customer.cleaningNotifications}
                               onChange={this.onChangeHandler}
                        />
                        <label className="form-check-label" htmlFor="gridCheck1">
                            Remind me about cleaning
                        </label>
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-secondary"
                                onClick={this.changePasswordToggle}>{this.state.changePassword ? 'Cancel' : 'Change password'}</button>
                    </div>
                    {this.state.changePassword && <ChangePassword passwordMatch={this.state.passwordMatch}
                                                                  updatePassword={this.onChangeHandler}
                                                                  checkPasswordMatch={this.checkPasswordMatch}
                                                                  error={this.state.error}
                                                                  newPasswordError={this.state.newPasswordError}

                    />}
                    <div className="text-center">
                        {this.state.success ? <p className="success"><i className="fa fa-check"></i>Updated</p> :
                            <button type="submit" className="btn btn-lg btn-primary col-sm-4 ">Save</button>}
                    </div>
                </form>

            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        customerId: state.user.id,
    }
};


export default connect(mapStateToProps)(ProfileForm);




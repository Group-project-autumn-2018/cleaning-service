import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as credentialActions from '../actions/credential-actions';
import './sign-up.css';
import MaskedInput from 'react-text-mask';
import CustomerApi from '../services/customer-api';
import VerificationForm from './verification-form';

class SignUpService extends Component{
    changeUsername = (event) => {
        this.setState({username: event.target.value});
        if (event.target.value.length < 3) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    changeEmail = (event) => {
        this.setState({email: event.target.value});
    };

    changePhone = (event) => {
        this.setState({phone: event.target.value});
        if (event.target.value.length < 18) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    changePassword = (event) => {
        this.setState({password: event.target.value});
    };

    changePasswordConfirm = (event) => {
        this.setState({confirmPassword: event.target.value});
        if (event.target.value !== this.state.password) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    render() {
        return (
            <div className="container signup-component">
                <div className="overlay" />
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 id="Logotype" className="card-title">
                                        Logotype
                                    </h2>
                                    <div className="form-group col-md-5">
                                        <input
                                            id="logotype"
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 id="company_description" className="card-title">
                                        What is the your company?
                                    </h2>
                                    <div className="form-group">
                                        <label htmlFor="description" className="col-form-label">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            placeholder="Smb about company"
                                            required
                                        />
                                        <label htmlFor="address" className="col-form-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="country, city, street, home, flat"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <h2 htmlFor="Types" className="card-title">
                                        Types of services provided and their cost
                                    </h2>
                                    <div id="smallRoomDiv">
                                        <label>Small room </label>
                                        <input type="checkBox" />
                                    </div>
                                    <div id="bigRoomDiv">
                                        <label>Big room </label>
                                        <input type="checkBox" />
                                    </div>
                                    <div id="bathRoomBDiV">
                                        <label>Bathroom</label>
                                        <input type="checkBox" />
                                    </div>
                                    <div className="email-feedback" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card person-card">
                        <div className="card-body">
                            <h2 id="who_message" className="card-title">
                                Who are you ?
                            </h2>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input
                                        id="first_name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.changeUsername}
                                        disabled={this.state.disabled}
                                    />
                                    <div id="first_name_feedback" className="invalid-feedback" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">How to contact you ?</h2>
                                    <div className="form-group">
                                        <label htmlFor="email" className="col-form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="example@gmail.com"
                                            value={this.state.email}
                                            onChange={this.changeEmail}
                                            disabled={this.state.disabled}
                                        />
                                        <div className="email-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tel" className="col-form-label">
                                            Phone number
                                        </label>
                                        <MaskedInput
                                            mask={[
                                                "+",
                                                "3",
                                                "7",
                                                "5",
                                                "(",
                                                /[0-9]/,
                                                /\d/,
                                                ")",
                                                " ",
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                "-",
                                                /\d/,
                                                /\d/,
                                                "-",
                                                /\d/,
                                                /\d/
                                            ]}
                                            className="form-control"
                                            placeholder="+375(__)___-__-__"
                                            guide={false}
                                            id="customer-phone"
                                            value={this.state.phone}
                                            onChange={this.changePhone}
                                            disabled={this.state.disabled}
                                        />
                                        <div className="phone-feedback" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Securize your account !</h2>
                                    <div className="form-group">
                                        <label htmlFor="password" className="col-form-label">
                                            Pasword
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Type your password"
                                            value={this.state.password}
                                            onChange={this.changePassword}
                                            disabled={this.state.disabled}
                                        />
                                        <div className="password-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_conf" className="col-form-label">
                                            Pasword (confirm)
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password_conf"
                                            placeholder="Type your password again"
                                            value={this.state.confirmPassword}
                                            onChange={this.changePasswordConfirm}
                                            disabled={this.state.disabled}
                                        />
                                        <div className="password_conf-feedback" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary btn-lg float-right"
                             onClick={this.preRegister}
                             disabled={this.state.disabled}
                        >
                            Sign up !
                        </button>
                    </div>
                </form>
            </div>
        );
    };
}
export default SignUpService;
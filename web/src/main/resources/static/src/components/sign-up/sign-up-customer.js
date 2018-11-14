import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as credentialActions from '../actions/credential-actions';
import './sign-up.css';
import MaskedInput from 'react-text-mask';
import CustomerApi from '../services/customer-api';
import VerificationForm from './verification-form';

class SignUpCustomer extends Component {
    customerApiService = new CustomerApi();

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            disabled: false,
            code: '',
            verificationStatus: false,
            message: ''
        }
    }

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

    changeCode = (event) => {
        this.setState({code: event.target.value});
        if (event.target.value.length !== 6) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    validate = () => {
        if (this.state.password !== this.state.confirmPassword) {
            return false;
        }
        if (this.state.username.length < 3) {
            return false;
        }
        return !(this.state.email === '' && this.state.phone === '+375');
    };

    preRegister = () => {
        if (this.validate()) {
            this.setState({disabled: true});
            const obj = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.phone
            };
            this.customerApiService.preRegister(obj).then(resp => {
                if (resp === 202) {
                    const key = (this.state.email !== '') ? this.state.email : this.state.phone;
                    const credentials = {
                        username: this.state.username,
                        base64Token: this.base64EncodeUnicode(key + this.state.password)
                    };
                    this.props.setCredentials(credentials);
                } else {
                    this.setState({disabled: false});
                }
            });
        }
    };

    verify = () => {
        const token = this.state.username + this.state.password;
        const obj = {
            code: this.state.code,
            encodedString: this.base64EncodeUnicode(token)
        };
        this.customerApiService.verify(obj).then(status => {
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

    render() {
        return (
            <div className="container signup-component">
                <div className="overlay"/>
                <form>
                    <div className="card person-card">
                        <div className="card-body">
                            <h2 id="who_message" className="card-title">Who are you ?</h2>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input id="first_name" type="text" className="form-control" placeholder="Username"
                                           value={this.state.username} onChange={this.changeUsername}
                                           disabled={this.state.disabled}/>
                                    <div id="first_name_feedback" className="invalid-feedback"/>
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
                                        <label htmlFor="email" className="col-form-label">Email</label>
                                        <input type="email" className="form-control" id="email"
                                               placeholder="example@gmail.com" value={this.state.email}
                                               onChange={this.changeEmail} disabled={this.state.disabled}/>
                                        <div className="email-feedback"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tel" className="col-form-label">Phone number</label>
                                        <MaskedInput
                                            mask={['+', '3', '7', '5', '(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-',
                                                /\d/, /\d/, '-', /\d/, /\d/]}
                                            className="form-control"
                                            placeholder="+375(__)___-__-__"
                                            guide={false}
                                            id="customer-phone"
                                            value={this.state.phone}
                                            onChange={this.changePhone}
                                            disabled={this.state.disabled}
                                        />
                                        <div className="phone-feedback"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Securize your account !</h2>
                                    <div className="form-group">
                                        <label htmlFor="password" className="col-form-label">Pasword</label>
                                        <input type="password" className="form-control" id="password"
                                               placeholder="Type your password" value={this.state.password}
                                               onChange={this.changePassword} disabled={this.state.disabled}/>
                                        <div className="password-feedback"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_conf" className="col-form-label">Pasword
                                            (confirm)</label>
                                        <input type="password" className="form-control" id="password_conf"
                                               placeholder="Type your password again" value={this.state.confirmPassword}
                                               onChange={this.changePasswordConfirm} disabled={this.state.disabled}/>
                                        <div className="password_conf-feedback"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

const mapStateToProps = (state) => {
    return {
        ...state.credentials
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCredentials: (credentials) => {
            dispatch(credentialActions.setCredentials(credentials));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCustomer);
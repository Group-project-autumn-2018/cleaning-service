import React, {Component} from 'react';
import {connect} from 'react-redux';
import './sign-up.css';
import MaskedInput from 'react-text-mask';
import CustomerApi from '../services/customer-api';
import VerificationForm from './verification-form';
import * as actions from '../actions/auth-actions';
import {withRouter} from 'react-router-dom';

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
            message: '',
            passwordsMatchError: false,
            usernameError: false,
            emailFormatError: false,
            emailError: false,
            passwordLengthError: false
        }
    }

    changeUsername = (event) => {
        this.setState({username: event.target.value});
        if (event.target.value.length < 3) {
            event.target.classList.add('invalid');
        } else {
            event.target.classList.remove('invalid');
        }
        this.formValidation(event);
    };

    changeEmail = (event) => {
        this.setState({email: event.target.value});
        this.formValidation(event);
    };

    changePhone = (event) => {
        this.setState({phone: event.target.value});
        if (event.target.value.length < 18) {
            event.target.classList.add('invalid');
        } else {
            event.target.classList.remove('invalid');
        }
    };

    changePassword = (event) => {
        const value = event.target.value;
        this.setState({password: event.target.value});
        if (value !== this.state.confirmPassword) {
            this.setState({passwordsMatchError: true});
        } else {
            this.setState({passwordsMatchError: false});
        }
        if (value.length < 6 || value.length > 30) {
            this.setState({passwordLengthError: true});
        } else {
            this.setState({passwordLengthError: false});
        }
    };

    changePasswordConfirm = (event) => {
        this.setState({confirmPassword: event.target.value});
        if (event.target.value !== this.state.password) {
            this.setState({passwordsMatchError: true});
            event.target.classList.add('invalid');
        } else {
            this.setState({passwordsMatchError: false});
            event.target.classList.remove('invalid');
        }
    };

    changeCode = (event) => {
        this.setState({code: event.target.value});
        if (event.target.value.length !== 6) {
            event.target.classList.add('invalid');
        } else {
            event.target.classList.remove('invalid');
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

    formValidation(event) {
        const name = event.target.name;
        switch (name) {
            case "username":
                this.validateLength(2, 50, event.target);
                break;
            case "email":
                this.validateLength(6, 30, event.target);
                if (!this.state.emailError) this.validateEmail(event.target);
                break;
        }
    }

    validate = () => {
        if (this.state.usernameError && this.state.emailFormatError && this.state.passwordsMatchError ||
            !this.state.emailError || !this.emailFormatError) {
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
                if (resp !== 202) {
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
                    let login;
                    if (this.state.email === '') {
                        login = this.state.phone;
                    } else {
                        login = this.state.email;
                    }
                    let password = this.state.password;
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
                    <div className="card person-card">
                        <div className="card-body">
                            <h2 id="who_message" className="card-title">Who are you ?</h2>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input id="first_name" type="text" className="form-control" placeholder="Username"
                                           value={this.state.username} onChange={this.changeUsername}
                                           disabled={this.state.disabled} name="username"/>
                                    <p className="errorMessage">Username size must be of length 2 to 50</p>
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
                                        <input type="email" className="form-control" id="email" name="email"
                                               placeholder="example@gmail.com" value={this.state.email}
                                               onChange={this.changeEmail} disabled={this.state.disabled}/>
                                        <p className="errorMessage">Email size must be of length 6 to 30 and it must
                                            have correct form</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tel" className="col-form-label">Phone number</label>
                                        <MaskedInput
                                            mask={['+', /[0-9]/, /\d/, /\d/, '(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
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
                                        {this.state.passwordLengthError ?
                                            <p className="text-danger">Password needs to be between 6 and 30
                                                characters long</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_conf" className="col-form-label">Pasword
                                            (confirm)</label>
                                        <input type="password" className="form-control" id="password_conf"
                                               placeholder="Type your password again" value={this.state.confirmPassword}
                                               onChange={this.changePasswordConfirm} disabled={this.state.disabled}/>
                                        {this.state.passwordsMatchError ?
                                            <p className="text-danger">Passwords don't match</p> : null}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpCustomer));
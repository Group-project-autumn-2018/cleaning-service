import React from 'react';
import MaskedInput, {conformToMask} from "react-text-mask";

const LoginForm = (props) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">How to contact you ?</h2>
                            <div className="form-group">
                                <label htmlFor="profileFormName" className="col-sm-4 col-form-label">Name</label>

                                <input type="text" className="form-control" id="profileFormName" placeholder="Name"
                                       name="username"
                                       value={props.service.username}
                                       onChange={props.onChangeHandler}
                                />
                                {props.usernameError ?
                                    <p className="errorMessage">Username size must be of length 2 to 50</p> : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-form-label">Email</label>
                                <input type="email" className="form-control" name="email"
                                       placeholder="example@gmail.com" value={props.service.email}
                                       onChange={props.changeEmail} disabled={props.disabled}/>
                                {(props.emailFormatError || props.emailError) ?
                                    <p className="errorMessage">Email size must be of length 6 to 30 and it must have
                                        correct form</p> : null}
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
                                    value={props.service.phone}
                                    onChange={props.changePhone}
                                    disabled={props.disabled}
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
                                <label htmlFor="password" className="col-form-label">Password</label>
                                <input type="password" className="form-control" id="password"
                                       placeholder="Type your password" value={props.service.password}
                                       onChange={props.changePassword} disabled={props.disabled}/>
                                {props.passwordLengthError ? <p className="errorMessage">
                                    Password needs to be between 6 and 30 characters long</p> : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_conf" className="col-form-label">Password
                                    (confirm)</label>
                                <input type="password" className="form-control" id="password_conf"
                                       placeholder="Type your password again" value={props.confirmPassword}
                                       onChange={props.changePasswordConfirm} disabled={props.disabled}/>
                                {props.passwordMatchError ?
                                    <p className="text-center text-danger">Passwords don't match</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default LoginForm;
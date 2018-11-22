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
                                <label htmlFor="email" className="col-form-label">Email</label>
                                <input type="email" className="form-control" id="email"
                                       placeholder="example@gmail.com" value={props.email}
                                       onChange={props.changeEmail} disabled={props.disabled}/>
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
                                    value={props.phone}
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
                                       placeholder="Type your password" value={props.password}
                                       onChange={props.changePassword} disabled={props.disabled}/>
                                <div className="password-feedback"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_conf" className="col-form-label">Password
                                    (confirm)</label>
                                <input type="password" className="form-control" id="password_conf"
                                       placeholder="Type your password again" value={props.confirmPassword}
                                       onChange={props.changePasswordConfirm} disabled={props.disabled}/>
                                <div className="password_conf-feedback"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default LoginForm;
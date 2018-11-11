import React from 'react';
import './sign-up.css';
import MaskedInput from 'react-text-mask';

const SignUpService = () => {
    return (
        <div className="container signup-component">
            <div className="overlay" />
            <form>
                <div className="card person-card">
                    <table>
                        <tr>
                            <td>
                                <div className="card-body">
                                    <h2 id="Logotype" className="card-title">
                                        Logotype
                                    </h2>
                                    <div className="row">
                                        <div className="form-group col-md-5">
                                            <input
                                                id="first_name"
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="card-body">
                                    <h2 id="who_message" className="card-title">
                                        Waht is the your company?
                                    </h2>
                                    <div className="row">
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-form-label">
                                                Descrition
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="Smb about company"
                                                required
                                            />
                                            <div className="email-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-form-label">
                                                Adress
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="country, city, street, home, flat"
                                                required
                                            />
                                            <div className="email-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-form-label">
                                                Types of services provided and their cost
                                            </label>
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
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="card person-card">
                    <div className="card-body">
                        <h2 id="who_message" className="card-title">
                            Who are you ?
                        </h2>
                        <div className="row">
                            <div className="form-group col-md-5">
                                <input
                                    id="first_name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
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
                                        required
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
                                        onBlur={() => {}}
                                        onChange={() => {}}
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
                                        required
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
                                        required
                                    />
                                    <div className="password_conf-feedback" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" className="btn btn-primary btn-lg float-right">
                        Sign up !
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpService;
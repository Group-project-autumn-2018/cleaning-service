import React, {Component} from 'react';
import './sign-in.css';
import MaskedInput from 'react-text-mask';


export default class SignIn extends Component {
    render() {
        return (
            <div className='text-center signin-component container'>
                <div className="overlay"></div>
                <form className="form-signin">
                    <h3 className="">Please sign in</h3>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" id="username" className="form-control" placeholder="Your username..." required
                           autoFocus/>
                    <MaskedInput
                        mask={['+','3','7','5','(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        className="form-control"
                        placeholder="+375(__)___-____"
                        guide={false}
                        id="my-input-id"
                        onBlur={() => {}}
                        onChange={() => {}}
                    />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit"
                            onClick={this.props.onSuccessfullLogin}>
                        Sign in
                    </button>
                    <p className="mt-5 mb-3">&copy; 2018</p>
                </form>
            </div>
        );
    }
};
import React, {Component} from 'react';
import './sign-in.css';

export default class SignIn extends Component {
    render() {
        return (
            <div className='text-center signin-component'>
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" id="username" className="form-control" placeholder="Your username..." required
                           autoFocus/>
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
                    <p className="mt-5 mb-3 text-muted">&copy; 2018</p>
                </form>
            </div>
        );
    }
};
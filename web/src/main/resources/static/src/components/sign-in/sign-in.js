import React, {Component} from 'react';
import {connect} from 'react-redux';
import './sign-in.css';
import * as actions from '../actions/auth-actions';

class SignIn extends Component {

    submitHandler = (e) => {
        e.preventDefault();
        let login = this.refs.login.value;
        let password = this.refs.password.value;
        this.props.fetchAccessToken(login, password);
    };

    componentDidUpdate() {
        switch (this.props.role[0]) {
            case "admin": {
                this.props.history.push("/admin")
            }
                break;
            case "customer":
                this.props.history.push("/profile");
                break;
            case "service":
                this.props.history.push("/service");
                break;
        }
    }


    render() {
        return (
            <div className='text-center signin-component container'>
                <div className="overlay"></div>
                <form className="form-signin" onSubmit={this.submitHandler}>
                    <h3 className="">Please sign in</h3>
                    {this.props.error ? <p className="text-danger">{this.props.error}</p> : null}
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input ref="login" type="text" id="username" className="form-control"
                           placeholder="Your username or phone" required
                           autoFocus/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input ref="password" type="password" id="inputPassword" className="form-control"
                           placeholder="Password"
                           required/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block">Sign in</button>
                    <p className="mt-5 mb-3">&copy; 2018</p>
                </form>
            </div>
        );
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
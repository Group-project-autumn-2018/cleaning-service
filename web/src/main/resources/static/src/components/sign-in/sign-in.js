import React, {Component} from 'react';
import {connect} from 'react-redux';
import './sign-in.css';
import MaskedInput from 'react-text-mask';
import * as actions from '../actions/auth-actions';

class SignIn extends Component {


    submitHandler = (e) => {
        e.preventDefault();
        let login = this.refs.login.value;
        let password = this.refs.password.value;
        this.props.fetchAccessToken(login, password);
    };

    componentDidUpdate(){
        if(this.props.isAuthenticated){

        }
    }


    render() {
        return (
            <div className='text-center signin-component container'>
                <div className="overlay"></div>
                <form className="form-signin" onSubmit={this.submitHandler}>
                    <h3 className="">Please sign in</h3>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input ref="login" type="text" id="username" className="form-control" placeholder="Your username..." required
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
                    <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" >Sign in</button>
                    <p className="mt-5 mb-3">&copy; 2018</p>
                </form>
            </div>
        );
    }

};


const mapDispatchToProps = (dispatch) =>{
    return{
        fetchAccessToken: (login, password) =>{
            dispatch(actions.fetchAccessToken(login, password));
        }
    }
};

export default connect(null, mapDispatchToProps)(SignIn);
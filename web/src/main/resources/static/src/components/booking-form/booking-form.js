import React, {Component} from 'react';
import './booking-form.css';


export default class BookingForm extends Component {
    render() {
        return (
            <div className='text-center signin-component container'>
                <div className="overlay"></div>
                <form className="form-signin">
                    <h3 className="">Application for cleaning service</h3>
                    <label htmlFor="Address" className="sr-only">Address</label>
                    <input type="text" id="Address" className="form-control" placeholder="Your address..." required
                           autoFocus/>

                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required/>

                    {/*<div className="checkbox mb-3">*/}
                    {/*<label>*/}
                    {/*<input type="checkbox" value="remember-me"/> Remember me*/}
                    {/*</label>*/}
                    {/*</div>*/}
                    {/*<button className="btn btn-lg btn-primary btn-block" type="submit"*/}
                    {/*onClick={this.props.onSuccessfullLogin}>*/}
                    {/*Sign in*/}
                    {/*</button>*/}
                    <p className="mt-5 mb-3">&copy; 2018</p>
                </form>
            </div>
        );
    }
};
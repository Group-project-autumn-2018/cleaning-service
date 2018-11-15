import React, {Component} from 'react';
import ChangePassword from './change-password'
import MaskedInput from 'react-text-mask';
import './profile-form.css';


export default class ProfileForm extends Component {

    state = {
        changePassword: false
    };

    handleClick = () => {
        this.setState({
            changePassword: !this.state.changePassword
        });
        console.log(!this.state.changePassword)
    };

    render() {
        return (
            <div className="profile-form-container">
                <form className="container profile-form">
                    <h3 className="text-center">Profile</h3>
                    <div className="form-group row">
                        <label htmlFor="profileFormName" className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="profileFormName" placeholder="Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormEmail" className="col-sm-4 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control" id="profileFormEmail" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormPhone" className="col-sm-4 col-form-label">Phone</label>
                        <div className="col-sm-8">
                            <MaskedInput
                                mask={['+', '3', '7', '5', '(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                className="form-control"
                                placeholder="+375(__)___-____"
                                guide={false}
                                id="profileFormPhone"
                                onBlur={() => {
                                }}
                                onChange={() => {
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormAddress" className="col-sm-4 col-form-label">Address</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="profileFormAddress" placeholder="Address"/>
                        </div>
                    </div>


                    <div className="form-check text-center">
                        <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                        <label className="form-check-label" htmlFor="gridCheck1">
                            Notify about cleaning
                        </label>
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-secondary"
                                onClick={this.handleClick}>{this.state.changePassword ? 'Cancel' : 'Change password'}</button>
                    </div>


                    {this.state.changePassword && <ChangePassword/>}


                    <div className="text-center">
                        <button type="button" className="btn btn-lg btn-primary col-sm-4 ">Save</button>
                    </div>


                </form>
            </div>
        )

    }

}




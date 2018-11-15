import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChangePassword from './change-password'
import MaskedInput, {conformToMask} from 'react-text-mask';
import './profile-form.css';
import {updateCustomer} from '../actions/customer-actions';
import {fetchEntity} from '../api/api-actions';


class ProfileForm extends Component {

    state = {
        changePassword: false,
        customer: {},
        phoneNumberMask: ['+', /[0-9]/, /\d/, /\d/, '(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
        passwordMatch: true
    };

    componentDidMount() {
        fetchEntity(this.props.customerId, "/customer", this.props.token)
            .then((customer)=>{
            this.setState({customer:customer})
            });
    };

    changePasswordToggle = () => {
        this.setState({
            changePassword: !this.state.changePassword
        });
        console.log(!this.state.changePassword)
    };

    submmitHandler = (e) => {
        e.preventDefault();
        console.log("submit");
        this.props.updateCustomer(this.state.customer, this.props.token);
        //todo error handler

    };


    onChangeHandler = (e) => {
        const name = e.target.name;
        console.log(e.target.value);
        const updatedCustomer = {...this.state.customer,
            [name]: name === "cleaningNotifications" ? e.target.checked: e.target.value};
        this.setState({customer:updatedCustomer})
    };

    checkPasswordMatch = (e) => {
        const name = e.target.name;
        console.log(e.target.value);
        console.log(e.target.name);
        this.setState({[name]: e.target.value});
        if (name === 'confPassword') {
            this.setState({passwordMatch: e.target.value === this.state.newPassword});
        }
    };

    render() {
        return (
            <div className="profile-form-container">
                <form className="container profile-form" onSubmit={this.submmitHandler}>
                    <h3 className="text-center"> My profile</h3>
                    <div className="form-group row">
                        <label htmlFor="profileFormName" className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="profileFormName" placeholder="Name"
                                   name="username"
                                   value={this.state.customer.username}
                                   onChange={this.onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormEmail" className="col-sm-4 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control" id="profileFormEmail" placeholder="Email"
                                   name="email"
                                   value={this.state.customer.email}
                                   onChange={this.onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormPhone" className="col-sm-4 col-form-label">Phone</label>
                        <div className="col-sm-8">
                            <MaskedInput
                                mask={this.state.phoneNumberMask}
                                className="form-control"
                                placeholder="375(__)___-____"
                                guide={false}
                                id="profileFormPhone"
                                name="phone"
                                value={conformToMask(this.state.customer.phone ? this.state.customer.phone:"",
                                    this.state.phoneNumberMask, {guide: false}).conformedValue}
                                onChange={this.onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileFormAddress" className="col-sm-4 col-form-label">Address</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="profileFormAddress" placeholder="Address"
                                   name="address"
                                   value={this.state.customer.address}
                                   onChange={this.onChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="form-check text-center">
                        <input className="form-check-input" type="checkbox" id="gridCheck1"
                               name="cleaningNotifications"
                               checked={this.state.customer.cleaningNotifications}
                               onChange={this.onChangeHandler}
                        />
                        <label className="form-check-label" htmlFor="gridCheck1">
                            Remind me about cleaning
                        </label>
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-secondary"
                                onClick={this.changePasswordToggle}>{this.state.changePassword ? 'Cancel' : 'Change password'}</button>
                    </div>
                    {this.state.changePassword && <ChangePassword passwordMatch={this.state.passwordMatch}
                                                                  checkPasswordMatch={this.checkPasswordMatch}/>}
                    <div className="text-center">
                        <button type="submit" className="btn btn-lg btn-primary col-sm-4 ">Save</button>
                    </div>
                </form>
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        customerId: state.user.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomer: (customerId, token) => {
            dispatch(updateCustomer(customerId, token))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);




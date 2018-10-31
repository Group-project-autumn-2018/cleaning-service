import React, {Component} from 'react';
import ModalToggleButton from './modal-toggle-button';
import BanToggleButton from "./ban-toggle-button";
import * as actions from '../actions/admin-actions';
import {connect} from 'react-redux';


class Customer extends Component {

    handleBanToggle = () => {
        let customer = {...this.props.customer};
        console.log(customer);
        customer.banReason = '';
        customer.banned = !this.props.customer.banned;
        this.props.updateCustomer(customer);
    };
    handlePrepareForUpdate =()=>{
        let customer = {...this.props.customer};
        this.props.prepareCustomerForUpdate(customer);
    };


    render() {
        return (
            <tr className="row">
                <td className="col">{this.props.customer.username}</td>
                <td className="col">{this.props.customer.phone}</td>
                <td className="col">{this.props.customer.email}</td>
                <td className="col">
                    {this.props.customer.banned ?
                        <BanToggleButton isBanned={this.props.customer.banned} onClick={this.handleBanToggle}/> :
                        <ModalToggleButton isBanned={this.props.customer.banned} onClick={this.handlePrepareForUpdate}/>}
                </td>
                <td className="col">{this.props.customer.banReason}</td>
            </tr>
        )
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomer: (customer) => {
            dispatch(actions.updateCustomer(customer))
        },
        prepareCustomerForUpdate: (customer)=>{
            dispatch(actions.prepareCustomerForUpdate(customer))
        }
    }
};


export default connect(null, mapDispatchToProps)(Customer);



import React, {Component} from 'react';
import ModalToggleButton from './modal-toggle-button';
import BanToggleButton from "./ban-toggle-button";
import * as actions from '../actions/admin-actions';
import {connect} from 'react-redux';


class Customer extends Component {

    entityURN = '/customer';

    handleBanToggle = () => {
        let customer = {...this.props.customer};
        customer.banReason = '';
        customer.banned = !this.props.customer.banned;
        this.props.updateCustomer(customer, this.entityURN);
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
        updateCustomer: (customer, entityURN) => {
            dispatch(actions.updateEntity(customer, entityURN))
        },
        prepareCustomerForUpdate: (customer)=>{
            dispatch(actions.prepareEntityForUpdate(customer))
        }
    }
};


export default connect(null, mapDispatchToProps)(Customer);



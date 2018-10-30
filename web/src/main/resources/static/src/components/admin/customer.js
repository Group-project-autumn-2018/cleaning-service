import React, {Component} from 'react';
import ModalToggleButton from './modal-toggle-button';
import BanToggleButton from "./ban-toggle-button";


export default class Customer extends Component{
    constructor(props){
        super(props);

        this.state = {
            isBanned: props.customer.banned,
            customer: props.customer
        };
    }

    toggleBanState=()=>{
        this.state.isBanned = !this.state.isBanned;
        let customer = this.state.customer;
        customer.banned = this.state.isBanned;

        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(customer)
        };
        fetch(`/customer/${customer.id}`, options);

    };


    render(){
        return(
            <tr className="row">
                <td className="col">{this.state.customer.username}</td>
                <td className="col">{this.state.customer.phone}</td>
                <td className="col">{this.state.customer.email}</td>
                <td className="col">
                    {this.state.isBanned ?  <BanToggleButton isBanned={this.state.isBanned} onClick={this.toggleBanState}/> : <ModalToggleButton isBanned={this.state.isBanned}/>}
                </td>
                <td className="col">{this.state.customer.banReason}</td>
            </tr>
        )
    }

};



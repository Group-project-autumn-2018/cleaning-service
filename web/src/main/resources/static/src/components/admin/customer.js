import React, {Component} from 'react';
import BanToggleButton from './ban-toggle-button';

export default class Customer extends Component{
    constructor(props){
        super(props);

        this.state = {
            isBanned: props.customer.banned,
            customer: props.customer
        };
    }

    toggleBanState=()=>{
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify( { banned: !this.state.isBanned } )
        };
        fetch(this.state.customer._links.self.href, options);
        this.state.isBanned = !this.state.isBanned;

    };


    render(){
        return(
            <tr className="row">
                <td className="col">{this.state.customer.username}</td>
                <td className="col">{this.state.customer.phone}</td>
                <td className="col">{this.state.customer.email}</td>
                <td className="col"><BanToggleButton onClick={this.toggleBanState} isBanned={this.state.isBanned}/></td>
                <td className="col">{this.state.customer.banReason}</td>
            </tr>
        )
    }




};



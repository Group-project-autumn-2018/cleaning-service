import React, {Component} from 'react';
import CustomersList from './customers-list'


export default class AdminCustomers extends Component {

    constructor(props) {
        super(props);
        this.state = {customers: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/customers'}).done(response => {
            this.setState({customers: response.entity._embedded.customers});
        });
    }


    render() {
        return (
            <div>
                <h1>Список клиентов</h1>
                <CustomersList customers={this.state.customers}/>
            </div>
        )

    }
}
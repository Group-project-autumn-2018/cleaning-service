import React, {Component} from 'react';
import OrderServiceButton from '../companies/order-service-button';

class Company extends Component {

    render() {
        return (
            <tr className="row">
                <td className="col">{this.props.company.logotype}</td>
                <td className="col">{this.props.company.companyname}</td>
                <td className="col">{this.props.company.address}</td>
                <td className="col">{this.props.company.ranking}</td>
                <td className="col">{this.props.company.price}</td>
                <td className="col">
                    <OrderServiceButton/>
                </td>
            </tr>
        )
    }
}

export default Company;
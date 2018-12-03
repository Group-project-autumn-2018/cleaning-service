import React, {Component} from 'react';

class CompanyOrder extends Component {


    render() {
        return (
            <tr className="row">
                <td className="col">{this.props.order.cleaningType}</td>
                <td className="col">{this.props.company.date}</td>
                <td className="col">{this.props.company.startTime}</td>
                <td className="col">{this.props.company.status}</td>
            </tr>
        )
    }
}



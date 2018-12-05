import React, {Component} from 'react';

class CompanyOrder extends Component {


    render() {
        return (
            <tr className="row bg-light px-5" className="row">
                <td  className="col">{this.props.order.cleaningType}</td>
                <td  className="col">{this.props.order.status}</td>
                <td  className="col">{this.props.order.date}</td>
                <td  className="col">{this.props.order.startTime}</td>
            </tr>
        )
    }
}

export default CompanyOrder;


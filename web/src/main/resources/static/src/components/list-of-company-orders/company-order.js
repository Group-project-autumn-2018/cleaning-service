import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CompanyOrder extends Component {


    render() {
        return (
            <tr className="row bg-light px-5" className="row">

                <td className="col"><Link
                    to={`/service/orders/${this.props.order.id}`}>{this.props.order.cleaningType}</Link>
                </td>
                <td className="col">{this.props.order.status}</td>
                <td className="col">{this.props.order.cleaningDay}</td>
                <td className="col">{this.props.order.cleaningTime}</td>
            </tr>
        )
    }
}

export default CompanyOrder;


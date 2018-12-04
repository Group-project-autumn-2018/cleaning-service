import React, {Component} from 'react';
import {connect} from 'react-redux';
import ConfirmModalToggleButton from './confirm-modal-toggle-button';
import * as orderActions from "../actions/order-actions";
import {Link} from "react-router-dom";

class Company extends Component {

    onClick = () => {
        this.props.updateOrder({
            ...this.props.order,
            company: this.props.company.id,
            companyName: this.props.company.name
        })
    };

    render() {
        return (
            <tr className="row">
                <td className="col">{this.props.company.logotype}</td>
                <td className="col"><Link to={`/company/${this.props.company.id}`}>{this.props.company.companyname}</Link></td>
                <td className="col">{this.props.company.address}</td>
                <td className="col">{this.props.company.ranking}</td>
                <td className="col">{this.props.company.price}</td>
                <td className="col">
                    <ConfirmModalToggleButton onClick={this.onClick}/>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = ({orderUpdate}) => {
    return {
        order: orderUpdate
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: (order) => {
            dispatch(orderActions.prepareOrderForUpdate(order))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);

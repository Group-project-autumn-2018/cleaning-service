import React, {Component} from 'react';
import {connect} from 'react-redux';
import Rating from 'react-rating';
import ConfirmModalToggleButton from './confirm-modal-toggle-button';
import * as orderActions from "../actions/order-actions";
import {Link} from "react-router-dom";

class Company extends Component {

    onClick = () => {
        this.props.updateOrder({
            ...this.props.order,
            company: this.props.company.id,
            companyName: this.props.company.username,
            price: this.props.company.averagePrice,
            estimatedTime: ''
            //todo add estimated time
        })
    };

    render() {
        return (
            <tr className="row">
                <td className="col"><img src={`/api/cleaning/${this.props.company.id}/image`} alt="image"
                                         width="100em" height="100em"/></td>
                <td className="col"><Link to={`/company/${this.props.company.id}`}>{this.props.company.username}</Link>
                </td>
                <td className="col">{this.props.company.address.address}</td>
                <td className="col">
                    <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x"
                            readonly={true} initialRating={this.props.company.averageRating}/>
                </td>
                <td className="col">{this.props.company.averagePrice}</td>
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

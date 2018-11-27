import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as orderActions from "../actions/order-actions";
import {fetchSaveEntity} from '../api/api-actions';
import './confirm-modal-css.css';

class CustomerConfirmModalForm extends Component {

    URN = "/order";

    onConfirm = async () => {
        await fetchSaveEntity({...this.props.order}, this.URN, this.props.user.token);
        this.props.history.push("")
    };


    render() {
        return (
            <div className="modal fade" id="confirm-modal" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content px-5">
                        <div className="modal-header text-center">
                            <h5 className="modal-title" id="confirmOrderModalTitle">Please confirm your order</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body container px-3">
                            <div className="row">
                                <div className="col-6">Address</div>
                                <div className="col-6">{this.props.order.address}</div>
                            </div>
                            <div className="row">
                                <div className="col-6">Cleaning Type</div>
                                <div className="col-6">{this.props.order.cleaningType}</div>
                            </div>
                            <div className="row">
                                <div className="col-6">Rooms</div>
                                <div className="col-6">
                                    <ul>
                                        <li>{`Small rooms ${this.props.order.smallRoomsCount}`}</li>
                                        <li>{`Big rooms ${this.props.order.bigRoomsCount}`}</li>
                                        <li>{`Bathrooms ${this.props.order.bathroomsCount}`}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">Cleaning Date</div>
                                <div className="col-6">{this.props.order.cleaningDay}</div>
                            </div>
                            <div className="row">
                                <div className="col-6">Cleaning Start Time</div>
                                <div className="col-6">{this.props.order.cleaningTime}</div>
                            </div>
                            <div className="row">
                                <div className="col-6">Frequency</div>
                                <div className="col-6">{this.props.order.frequency}</div>
                            </div>
                            <div className="row">
                                <div className="col-6">Duration</div>
                                <div className="col-6">{this.props.order.duration}</div>
                            </div>
                            <div className="row">
                                <div className="col-6">Cleaning Company</div>
                                <div className="col-6">{this.props.order.companyName}</div>
                            </div>
                            <div className="row">
                                <div className="col-6">Estimated Price</div>
                                <div className="col-6">{this.props.order.estimatedPrice}</div>
                            </div>
                            <div className="row">
                                <div className="col-6">Estimated Time</div>
                                <div className="col-6">{this.props.order.estimatedTime}</div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-danger" data-dismiss="modal">
                                Close
                            </button>
                            <button type="submit" className="btn btn-secondary btn btn-success" data-dismiss="modal"
                                    onClick={this.onConfirm}>Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({user, orderUpdate}) => {
    return {
        user: user,
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerConfirmModalForm);

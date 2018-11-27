import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as orderActions from "../actions/order-actions";
import {fetchSaveEntity} from '../api/api-actions';
import './companies.css';

class CustomerConfirmModalForm extends Component {

    URN = "/order";

    onConfirm = () => {
        fetchSaveEntity({...this.props.order}, this.URN, this.props.user.token)
    };


    render() {
        return (
            <div className="modal fade" id="confirm-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <form className="modal-dialog  modal-dialog-centered"   role="document">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" align="center" id="confirmOrderModalTitle"><b>Please confirm your order</b></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body container">
                            <div className="row">
                                <div className="col-4">Address</div>
                                <div className="col-8">{this.props.order.address}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Type</div>
                                <div className="col-8">{this.props.order.cleaningType}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Rooms</div>
                                <div className="col-8">
                                    <ul>
                                        <li>{`Small rooms ${this.props.order.smallRoomsCount}`}</li>
                                        <li>{`Big rooms ${this.props.order.bigRoomsCount}`}</li>
                                        <li>{`Bathrooms ${this.props.order.bathroomsCount}`}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Date</div>
                                <div className="col-8">{this.props.order.cleaningDay}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Start Time</div>
                                <div className="col-8">{this.props.order.cleaningTime}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Frequency</div>
                                <div className="col-8">{this.props.order.frequency}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Duration</div>
                                <div className="col-8">{this.props.order.duration}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Company</div>
                                <div className="col-8">{this.props.order.company}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Estimated Price</div>
                                <div className="col-8">{this.props.order.estimatedPrice}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Estimated Time</div>
                                <div className="col-8">{this.props.order.estimatedTime}</div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={this.onConfirm}>Confirm
                            </button>
                        </div>
                    </div>
                </form>

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

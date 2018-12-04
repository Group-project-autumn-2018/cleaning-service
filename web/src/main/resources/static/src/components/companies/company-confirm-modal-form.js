import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEntity, fetchUpdateMultipartEntity} from "../api/api-actions";

class CompanyConfirmModalForm extends Component {

    URN = "/order";

    constructor(props) {
        super(props);
        this.state = {
            order: {
                id: 1,
                customer: '',
                address: '',
                cleaningType: '',
                smallRoomsCount: '',
                bigRoomsCount: '',
                bathroomsCount: '',
                cleaningDay: '',
                cleaningTime: '',
                frequency: '',
                duration: '',
                email: '',
                price: 120,
                estimatedTime: '',
                status: ''
            }
        }
    }

    componentDidMount() {
        fetchEntity(this.props.companyId, this.URN, this.props.user.token)
            .then((order) => {
                this.setState({order: order})
            });
    }


    onConfirm = () => {
        fetchUpdateMultipartEntity("CONFIRMED", this.URN, this.props.user.token, this.state.id)
    };

    onClose = () => {
        fetchUpdateMultipartEntity("REJECTED", this.URN, this.props.user.token, this.state.id)
    };


    render() {
        return (
            <React.Fragment>
                <div className="form-group row">
                    <div className="col-sm-8">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmOrderModalTitle">Please confirm your order</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="col-sm-8 ">
                            <div className="row">
                                <div className="col-4">Address</div>
                                <div className="col-8">{this.state.order.address}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Type</div>
                                <div className="col-8">{this.state.order.cleaningType}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Rooms</div>
                                <div className="col-8">
                                    <ul>
                                        <li>{`Small rooms ${this.state.order.smallRoomsCount}`}</li>
                                        <li>{`Big rooms ${this.state.order.bigRoomsCount}`}</li>
                                        <li>{`Bathrooms ${this.state.order.bathroomsCount}`}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Date</div>
                                <div className="col-8">{this.state.order.cleaningDay}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Start Time</div>
                                <div className="col-8">{this.state.order.cleaningTime}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Frequency</div>
                                <div className="col-8">{this.state.order.frequency}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Duration</div>
                                <div className="col-8">{this.state.order.duration}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Customer</div>
                                <div className="col-8">{this.state.order.customer}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Estimated Price</div>
                                <div className="col-8">{this.state.order.price}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Estimated Time</div>
                                <div className="col-8">{this.state.order.estimatedTime}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Order status</div>
                                <div className="col-8">{this.state.order.status}</div>
                            </div>
                        </div>
                        <div className="modal-footer">

                            <button type="submit" className="btn btn-secondary btn btn-danger" data-dismiss="modal"
                                    onClick={this.onClose}>Refuse order
                            </button>
                            <button type="submit" className="btn btn-secondary btn btn-success" data-dismiss="modal"
                                    onClick={this.onConfirm}>Confirm order
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }


}


const mapStateToProps = (state) => {
    return {
        user: {...state.user}
    }
};


export default connect(mapStateToProps)(CompanyConfirmModalForm);

import React, {Component} from 'react';
import {connect} from 'react-redux';


class CustomerConfirmModalForm extends Component {

    render() {
        console.log(this.props);
        return (
            <div className="modal fade" id="confirm-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmOrderModalTitle">Please confirm your order</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body container">
                            <div className="row">
                                <div className="col-4">Address</div>
                                <div className="col-8">{this.props.address}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Type</div>
                                <div className="col-8"></div>
                            </div>
                            <div className="row">
                                <div className="col-4">Rooms</div>
                                <div className="col-8">
                                    <ul></ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Date</div>
                                <div className="col-8"></div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Start Time</div>
                                <div className="col-8"></div>
                            </div>
                            <div className="row">
                                <div className="col-4">Frequency</div>
                                <div className="col-8"></div>
                            </div>
                            <div className="row">
                                <div className="col-4">Cleaning Company</div>
                                <div className="col-8"></div>
                            </div>
                            <div className="row">
                                <div className="col-4">Estimated Price</div>
                                <div className="col-8"></div>
                            </div>
                            <div className="row">
                                <div className="col-4">Estimated Time</div>
                                <div className="col-8"></div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-danger" data-dismiss="modal">
                                Close
                            </button>
                            <button type="submit" className="btn btn-secondary btn btn-success">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}


const mapStateToProps = (state) => {
    return {
        ...state.order
    }
};

export default connect(mapStateToProps)(CustomerConfirmModalForm);
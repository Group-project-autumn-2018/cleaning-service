import React, {Component} from 'react';
import BanToggleButton from '../ban-toggle-button';
import {connect} from 'react-redux';
import * as actions from '../../actions/admin-actions';

class BanModal extends Component {

    entityURN = '/customer';

    handleClick = () => {

        let customer = {...this.props.customer};
        let banned = !customer.banned;
        let banReason = this.refs.banReasonOption.value + " " + this.refs.banReasonText.value;
        this.props.updateCustomer({...customer, banned, banReason}, this.entityURN);
        this.refs.banReasonText.value = '';
    };

    render() {
        return (
            <div className="modal fade" id="ban-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Укажите причину блокировки</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body container d-flex flex-column justify-content-center">
                            <select ref="banReasonOption">
                                <option value="No payment">No payment</option>
                                <option value="False registration data">False registration data</option>
                                <option value="Rules violation">Rules violation</option>
                            </select>
                            <textarea className="mt-2" ref="banReasonText" cols="30" rows="3"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <BanToggleButton onClick={this.handleClick} isBanned={false}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
;

const mapStateToProps = (state) => {
    return {
        customer: state.entityToUpdate
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomer: (customer, entityURN) => {
            dispatch(actions.updateEntity(customer, entityURN))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BanModal);
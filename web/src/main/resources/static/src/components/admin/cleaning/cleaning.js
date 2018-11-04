import React, {Component} from 'react';
import ModalToggleButton from '../modal-toggle-button';
import BanToggleButton from "../ban-toggle-button";
import * as actions from '../../actions/admin-actions';
import {connect} from 'react-redux';


class Cleaning extends Component {

    entityURN = '/cleaning';

    handleBanToggle = () => {
        let cleaning = {...this.props.cleaning};
        cleaning.banReason = '';
        cleaning.banned = !this.props.cleaning.banned;
        this.props.updateCleaning(cleaning, this.entityURN);
    };
    handlePrepareForUpdate = () => {
        let cleaning = {...this.props.cleaning};
        this.props.prepareCleaningForUpdate(cleaning);
    };


    render() {
        return (
            <tr className="row">
                <td className="col">{this.props.cleaning.label}</td>
                <td className="col">{this.props.cleaning.email}</td>
                <td className="col">
                    {this.props.cleaning.banned ?
                        <BanToggleButton isBanned={this.props.cleaning.banned} onClick={this.handleBanToggle}/> :
                        <ModalToggleButton isBanned={this.props.cleaning.banned}
                                           onClick={this.handlePrepareForUpdate}/>}
                </td>
                <td className="col">{this.props.cleaning.banReason}</td>
            </tr>
        )
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCleaning: (cleaning, entityURN) => {
            dispatch(actions.updateEntity(cleaning, entityURN))
        },
        prepareCleaningForUpdate: (cleaning) => {
            dispatch(actions.prepareEntityForUpdate(cleaning))
        }
    }
};


export default connect(null, mapDispatchToProps)(Cleaning);



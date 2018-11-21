import React, {Component} from 'react';
import ConfirmModalToggleButton from './confirm-modal-toggle-button'

class Company extends Component {

    render() {
        return (
            <tr className="row">
                <td className="col">{this.props.company.logotype}</td>
                <td className="col">{this.props.company.companyname}</td>
                <td className="col">{this.props.company.address}</td>
                <td className="col">{this.props.company.ranking}</td>
                <td className="col">{this.props.company.price}</td>
                <td className="col">
                    <ConfirmModalToggleButton onClick={this.onConfirm}/>
                </td>
            </tr>
        )
    }
}

export default Company;
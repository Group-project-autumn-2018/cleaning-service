import React, {Component} from 'react';
import Rating from 'react-rating';
import {Link, withRouter} from "react-router-dom";

class CompanyForSearching extends Component {

    onClick = () => {
        this.props.history.push(`/booking/${this.props.company.id}`);
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
                <td className="col">
                    <div>
                        <button type="button" className="btn btn-secondary btn btn-success"
                                onClick={this.onClick}>
                            Make an order
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}

export default withRouter(CompanyForSearching);

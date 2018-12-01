import React, {Component} from 'react';
import './companies.css';
import SortList from '../companies/sort-list';
import {fetchCompaniesPOST} from '../api/api-actions';
import connect from "react-redux/es/connect/connect";

class Companies extends Component {

    entityURN = '/cleaning/search/companies';

    sorting = ["price", "remoteness", "ranking"];

    constructor(props) {
        super(props);
        this.state = {
            companies: {}
        }
    }

    searchCompanyDto = {
        cleaningTypesDto: this.props.orderUpdate.cleaningTypesDto,
        smallRoomsCount: this.props.orderUpdate.smallRoomsCount,
        bigRoomsCount: this.props.orderUpdate.bigRoomsCount,
        bathroomsCount: this.props.orderUpdate.bathroomsCount,
        address: this.props.orderUpdate.address,
        latitude: this.props.orderUpdate.updatedOrder.lat,
        longitude: this.props.orderUpdate.updatedOrder.lon,
        email: this.props.orderUpdate.email
    };

    componentDidMount() {
        fetchCompaniesPOST(this.searchCompanyDto, this.entityURN, this.props.user.token)
            .then((companies) => {
                this.setState({companies: companies})
            });
    };

    render() {
        console.log(this.props.companies);
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Available services</b></h3>
                <SortList sort={this.sorting}/>
                {/*<CompaniesList companies={this.companies}/>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(Companies);

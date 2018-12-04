import React, {Component} from 'react';
import './companies.css';
import SortList from '../companies/sort-list';
import {fetchCompaniesPOST} from '../api/api-actions';
import connect from "react-redux/es/connect/connect";
import CompaniesList from "../companies/companies-list"

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
        cleaningType: this.props.orderUpdate.cleaningType,
        smallRoomsCount: this.props.orderUpdate.smallRoomsCount,
        bigRoomsCount: this.props.orderUpdate.bigRoomsCount,
        bathroomsCount: this.props.orderUpdate.bathroomsCount,
        address: this.props.orderUpdate.address,
        latitude: this.props.orderUpdate.updatedOrder.lat,
        longitude: this.props.orderUpdate.updatedOrder.lon,
        email: this.props.orderUpdate.email,
        price: ""
    };

    componentDidMount() {
        this.props.fetchCompaniesPOST(this.searchCompanyDto, this.entityURN, this.props.token);
    };

    render() {
        console.log(this.state.companies);
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Available services</b></h3>
                <SortList sort={this.sorting}/>
                <CompaniesList companies={this.props.companies}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        companies: state.entities,
        orderUpdate: state.orderUpdate,
        token: state.user.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCompaniesPOST: (entity, entityURN, token) => {
            dispatch(fetchCompaniesPOST(entity, entityURN, token));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);

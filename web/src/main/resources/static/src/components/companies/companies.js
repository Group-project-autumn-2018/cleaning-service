import React, {Component} from 'react';
import './companies.css';
import SortList from '../companies/sort-list';
import {fetchCompaniesPOST} from '../api/api-actions';
import connect from "react-redux/es/connect/connect";
import CompaniesList from "../companies/companies-list"

class Companies extends Component {

    entityURN = '/cleaning/search/companies';

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
        address: this.props.isAuthenticated ? this.props.address.address : this.props.orderUpdate.address.address,
        latitude: this.props.isAuthenticated ? this.props.address.lat : this.props.orderUpdate.address.lat,
        longitude: this.props.isAuthenticated ? this.props.address.lon : this.props.orderUpdate.address.lon,
        email: this.props.orderUpdate.email,
        price: "",
        estimatedTime: "",
        sort: ""
    };

    selectSortHandler = (option) => {
        const sort = option ? option.value : "";
        this.props.fetchCompaniesPOST({
            ...this.searchCompanyDto, sort: sort
        }, this.entityURN, this.props.token);
    };

    componentDidMount() {
        this.props.fetchCompaniesPOST(this.searchCompanyDto, this.entityURN, this.props.token);
    };

    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Available services</b></h3>
                <SortList selectHandler={this.selectSortHandler}/>
                <CompaniesList companies={this.props.companies}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        companies: state.entities,
        orderUpdate: state.orderUpdate,
        ...state.user
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

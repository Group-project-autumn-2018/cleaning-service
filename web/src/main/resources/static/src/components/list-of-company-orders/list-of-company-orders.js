import React, {Component} from 'react';
import './list-of-company-orders.css';
import ListOrders from '../list-of-company-orders/company-orders';
import {connect} from 'react-redux';
import {fetchEntities} from '../api/api-actions';
import Pagination from "react-js-pagination";
import SortFilter from "../list-of-company-orders/sort-list";

class ListOfCompanyOrders extends Component {

    state = {
        cleaningType: null,
        status: null,
        search: null,
        sort: null
    };

    entityURN = '/order/service';

    componentDidMount() {
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token, this.props.userID);
    }

    handlePageChange = (page) => {
        this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID);
    };

    handleChange = (e) => {
        const value = e.target.value.replace(/ /g, "_");
        const name = e.target.name;
        this.setState({[name]: value})

    };

    handleSearch = () => {
        let search = "&search=";
        if (this.state.cleaningType) search += `cleaningType:${this.state.cleaningType},`;
        if (this.state.status) search += `status:${this.state.status},`;
        search = search.substring(0, search.length - 1);

        this.setState({search: search});
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID, search);
    };



    handleSort = (option) => {
        const sort = option ? option.value : "";
        const search = this.state.search ? this.state.search : '';
        this.setState({sort: sort});
        const sortParam = search + sort;
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID, sortParam);
    };

    showAll = () => {
        this.setState({search: null});
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID);
    };



    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Active orders</b></h3>
                <SortFilter onSort={this.handleSort} selectedTypeOption={this.state.selectedTypeOption}
                            selectedSortOption={this.state.selectedSortOption}
                            showAll={this.showAll}/>
                <ListOrders orders={this.state.orders} />
                <nav aria-label="Page navigation" className="mx-auto">
                    <Pagination activePage={this.props.activePage + 1}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                totalItemsCount={this.props.totalItemsCount}
                                pageRangeDisplayed={this.props.totalPages < 5 ? this.props.totalPages : 5}
                                onChange={this.handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                innerClass="pagination justify-content-center"
                    />
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.pagination,
        orders: state.entities,
        token: state.user.token,
        userID: state.user.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (page, size, entityURN, token, userID, search) => {
            dispatch(fetchEntities(page, size, entityURN, token, userID, search))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfCompanyOrders);
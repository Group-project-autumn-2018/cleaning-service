import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEntities} from '../api/api-actions';
import Pagination from "react-js-pagination";
import OrdersList from './orders-list';
import {Link} from "react-router-dom";
import './customer-order-list.css';
import SearchSortFilter from './search-sort-filter';


class CustomerOrdersList extends Component {

    state = {
        address: null,
        company: null,
        cleaningType: null,
        search: null,
        sort: null
    };

    entityURN = '/order';

    componentDidMount() {
        if (this.props.role === 'admin') {
            this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token);
        } else {
            this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token, this.props.userID);

        }
    }


    handlePageChange = (page) => {
        const sort = this.state.sort ? this.state.sort : '';
        const search = this.state.search ? this.state.search : '';
        const sortParam = search + sort;
        if (this.props.role === 'admin') {
            this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
                this.props.token, null, sortParam);
        } else {
            this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
                this.props.token, this.props.userID, sortParam);
        }
    };

    handleChange = (e) => {
        let value;
        let name;
        if (e.value) {
            value = e.value;
            name = "cleaningType";
        } else {
            value = e.target.value;
            name = e.target.name;
        }
        this.setState({[name]: value.replace(/ /g, "_")})
    };

    handleSearch = () => {
        let search = "&search=";
        if (this.state.address) search += `address:${this.state.address},`;
        if (this.state.company) search += `company:${this.state.company},`;
        if (this.state.cleaningType) search += `cleaningType:${this.state.cleaningType},`;

        search = search.substring(0, search.length - 1);

        this.setState({search: search});

        if (this.props.role === 'admin') {
            this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
                this.props.token, null, search);
        } else {
            this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
                this.props.token, this.props.userID, search);
        }

    };

    handleSort = (option) => {
        const sort = option ? option.value : "";
        const search = this.state.search ? this.state.search : '';
        this.setState({sort: sort});
        const sortParam = search + sort;
        if (this.props.role === 'admin') {
            this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
                this.props.token, null, sortParam);
        } else {
            this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
                this.props.token, this.props.userID, sortParam);
        }

    };

    showAll = () => {
        this.setState({search: null});
        if (this.props.role === 'admin') {
            this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token);
        } else {
            this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token, this.props.userID);
        }
    };

    render() {
        return (
            <div className="bg-light container-fluid w-100 h-100 order-list">
                <h1 className="text-center">{this.props.role === 'admin' ? "All Orders" : "Your Orders"}
                </h1>
                <div className="position-relative nav-container">
                    <Link to="/booking" type="button" className="btn btn-primary new-order-btn">New Order</Link>

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
                <SearchSortFilter onChange={this.handleChange} onClick={this.handleSearch}
                                  onSort={this.handleSort} selectedTypeOption={this.state.selectedTypeOption}
                                  selectedSortOption={this.state.selectedSortOption}
                                  showAll={this.showAll}/>
                {this.props.orders.length > 0 ? <OrdersList orders={this.props.orders}/> :
                    <div className="bg-light container-fluid w-100 h-100 pt-3 order-list">
                        <h1 className="text-center">No orders</h1>
                    </div>
                }
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
        role: state.user.role[0]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (page, size, entityURN, token, userID, search) => {
            dispatch(fetchEntities(page, size, entityURN, token, userID, search))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersList);


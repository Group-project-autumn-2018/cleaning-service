import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEntities} from '../actions/admin-actions';
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
        this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID);
    };

    handleChange = (e) => {
        const value = e.target.value.replace(/ /g, "_");
        const name = e.target.name;
        this.setState({[name]: value})

    };

    handleSearch = () => {
        this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID, search);
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
                    <SearchSortFilter onChange={this.handleChange} onClick={this.handleSearch}/>
                    <OrdersList orders={this.props.orders}/>
                </div>)

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
        fetchOrders: (page, size, entityURN, token, userID) => {
            dispatch(fetchEntities(page, size, entityURN, token, userID))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersList);


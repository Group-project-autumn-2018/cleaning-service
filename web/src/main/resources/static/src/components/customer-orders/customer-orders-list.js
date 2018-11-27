import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEntities} from '../actions/admin-actions';
import Pagination from "react-js-pagination";
import OrdersList from './orders-list';
import {Link} from "react-router-dom";
import './customer-order-list.css';


class CustomerOrdersList extends Component {
    entityURN = '/order';

    componentDidMount() {
        this.init();
    }

    async init() {
        await this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token, this.props.userID);
        console.log(this.props.orders.length);
    }

    handlePageChange = (page) => {
        this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID);
    };

    render() {

        if (this.props.orders.length !== 0) {
            return (
                <div className="bg-light container-fluid w-100 h-100 orderList">
                    <h1 className="text-center">Your Orders</h1>
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


                    <OrdersList orders={this.props.orders}/>
                </div>)
        } else {
            return (
                <div className="bg-light container-fluid w-100 h-100">
                    <h1 className="text-center">No Orders</h1>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        ...state.pagination,
        orders: state.entities,
        token: state.user.token,
        userID: state.user.id
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


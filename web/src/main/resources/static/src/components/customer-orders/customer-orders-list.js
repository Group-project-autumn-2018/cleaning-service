import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEntities} from '../actions/admin-actions';
import Pagination from "react-js-pagination";
import OrdersList from './orders-list';


class CustomerOrdersList extends Component {
    entityURN = '/order';

    componentDidMount() {
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token, this.props.userID);
        console.log(this.props.orders.length);
    }

    handlePageChange = (page) => {
        this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID);
    };

    render() {

        if (this.props.orders.length !== 0) {
            return (
                <div className="bg-light container-fluid">
                    <h1 className="text-center">Your Orders</h1>

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
                    <OrdersList orders={this.props.orders}/>
                </div>)
        } else {
            return <h1 className="text-center">No Orders</h1>
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


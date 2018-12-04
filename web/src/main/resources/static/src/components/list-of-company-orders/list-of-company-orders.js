import React, {Component} from 'react';
import './list-of-company-orders.css';
import ListOrders from '../list-of-company-orders/company-orders';
import SortList from '../list-of-company-orders/sort-list';
import {connect} from 'react-redux';
import {fetchEntities} from '../api/api-actions';
import Pagination from "react-js-pagination";

class ListOfCompanyOrders extends Component {

    state = {
        cleaningType: null,
        date: null,
        startTime: null,
        search: null,
        status: null
    };

    entityURN = '/order/service';

   /* orders = [{
        id: "1",
        cleaningType: "logo",
        date: "25.08.2018",
        startTime: "8:00",
        status: "new"
    },
        {
            id: "2",
            cleaningType: "logo",
            date: "25.08.2018",
            startTime: "8:00",
            status: "new",
        },
        {
            id: "3",
            cleaningType: "logo",
            date: "25.08.2018",
            startTime: "8:00",
            status: "new",
        }];*/

    componentDidMount() {
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token, this.props.userID);
    }

    handlePageChange = (page) => {
        this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID);
    };

    sorting = ["status", "type"];

    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Active orders</b></h3>
                <SortList sort={this.sorting}/>
                <ListOrders orders={this.props.orders}/>
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
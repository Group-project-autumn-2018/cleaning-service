import React, {Component} from 'react';
import './list-of-company-orders.css';
import ListOrders from '../list-of-company-orders/company-orders';
import {connect} from 'react-redux';
import {fetchEntitiesByTypeAndStatus, fetchEntity} from '../api/api-actions';
import Pagination from "react-js-pagination";
import SortFilter from "../list-of-company-orders/sort-list";
import TypeDiagram from "../order-schedules/type-diagram";
import DaysDiagram from "../order-schedules/frequency-diagram";
import StatusDiagram from "../order-schedules/status-diagram";
import {connectWs} from '../actions/notification-actions';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        this.props.connectWs(this.props.token);
        fetchEntity(this.props.userID, "/cleaning", this.props.token)
            .then((service) => {
                this.setState({service: service, tempAddress: service.address.address})
            });
    }

    handlePageChange = (page) => {
        this.props.fetchOrders(page - 1, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID);
    };

    handleChange = (e) => {

        const statuses=['NEW', 'CONFIRMED', 'REJECTED', 'COMPLETED'];

        let value;
        let name;
        if (e.value) {
            value = e.value;
            if(statuses.includes(e.value)) {
                name="status";
            } else {
                name="cleaningType";
            }
        } else {
            value = e.target.value;
            name = e.target.name;
        }

        this.setState({[name]: value})
    };

    handleSearch = () => {

        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID, this.state.cleaningType, this.state.status);
    };


    showAll = () => {
        this.setState({search: null});
        const sortParam="&sort=cleaningDay,desc";
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN,
            this.props.token, this.props.userID, sortParam);
    };



    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Active orders</b></h3>
                <SortFilter className="width:80%"
                            onChange={this.handleChange}
                            onClick={this.handleSearch}
                            onSort={this.handleSort} selectedTypeOption={this.state.selectedTypeOption}
                            selectedSortOption={this.state.selectedSortOption}
                            selectedStatusOption={this.state.selectedStatusOption}
                            showAll={this.showAll}/>
                <ListOrders orders={this.props.orders} />
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
                <TypeDiagram/>
                <StatusDiagram/>
                <DaysDiagram/>
                <ToastContainer autoClose={15000} toastClassName='toast-container' position="bottom-right"/>
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
        fetchOrders: (page, size, entityURN, token, userID, cleaningType, status) => {
            dispatch(fetchEntitiesByTypeAndStatus(page, size, entityURN, token, userID, cleaningType, status))
        },
        connectWs: (token) => {
            dispatch(connectWs(token))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfCompanyOrders);
import React, {Component} from 'react';
import './companies.css';
import CompaniesList from "./company-list"
import {fetchEntities} from "../api/api-actions";
import Pagination from "react-js-pagination";
import connect from "react-redux/es/connect/connect";

class CompaniesWithSearch extends Component {

    entityURN = '/cleaning';

    constructor(props) {
        super(props);
        this.state = {

            companies: {}
        }
    }


    componentDidMount() {
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token);
    }


    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
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

                <CompaniesList companies={this.props.companies}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.pagination,
        companies: state.entities,
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


export default connect(mapStateToProps, mapDispatchToProps)(CompaniesWithSearch);

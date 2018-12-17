import React, {Component} from 'react';
import './companies.css';
import CompaniesList from "./company-list"
import {fetchEntities} from "../api/api-actions";
import Pagination from "react-js-pagination";
import connect from "react-redux/es/connect/connect";
import CompanySearchBar from "./company-search-bar";

class CompaniesWithSearch extends Component {

    entityURN = '/cleaning';

    constructor(props) {
        super(props);
        this.state = {
            company: null,
            cleaningType: null,
            search: null,
            companies: {},
            itemsCountPerPage: 5
        }
    }

    componentDidMount() {
        this.props.fetchOrders(0, this.state.itemsCountPerPage, this.entityURN, this.props.token, null);
    }

    showAll = () => {
        this.setState({search: null});
        this.props.fetchOrders(0, this.state.itemsCountPerPage, this.entityURN, this.props.token, null);
    };

    handleSearch = () => {
        let search = "&search=";
        if (this.state.company) search += `company:${this.state.company},`;
        if (this.state.cleaningType) search += `cleaningType:${this.state.cleaningType},`;
        search = search.substring(0, search.length - 1);
        this.setState({search: search});
        this.props.fetchOrders(0, this.state.itemsCountPerPage, this.entityURN + "/search",
            this.props.token, null, search);
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

    handlePageChange = (page) => {
        const search = this.state.search ? this.state.search : '';

        if (search === '') {
            this.props.fetchOrders(page - 1, this.state.itemsCountPerPage, this.entityURN,
                this.props.token, null, search);
        }
        else {
            this.props.fetchOrders(page - 1, this.state.itemsCountPerPage, this.entityURN + "/search",
                this.props.token, null, search);
        }

    };

    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h1 className="text-center">Cleaning company list</h1>
                <CompanySearchBar onChange={this.handleChange} onClick={this.handleSearch}
                                  selectedTypeOption={this.state.selectedTypeOption}
                                  showAll={this.showAll}/>
                <h1></h1>
                <CompaniesList companies={this.props.companies}/>
                <nav aria-label="Page navigation" className="mx-auto">
                    <Pagination activePage={this.props.activePage + 1}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.props.totalItemsCount}
                                pageRangeDisplayed={this.props.totalPages < 5 ? this.props.totalPages : 5}
                                onChange={this.handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                innerClass="pagination justify-content-center"
                    />
                </nav>

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

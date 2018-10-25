import React, {Component} from 'react';
import CustomersList from './customers-list';
import './admin-customers.css';
import Pagination from "react-js-pagination";


export default class AdminCustomers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            itemsCountPerPage: 10,
            activePage: 1

        };

    }

    fetchData = (pageNumber) => {
        console.log(pageNumber);
        fetch(`/api/customers?page=${pageNumber - 1}&size=${this.state.itemsCountPerPage}`).then(resolve => resolve.json()).then(response => {
            console.log(response);
            console.log(pageNumber);
            this.setState({
                customers: response._embedded.customers,
                totalItemsCount: response.page.totalElements,
                activePage: pageNumber,
                totalPages: response.page.totalPages
            });
        });
    };

    componentDidMount() {
        //
        // client({method: 'GET', path: '/api/customers'}).done(response => {
        //     this.setState({customers: response.entity._embedded.customers});
        // });
        this.fetchData(this.state.activePage);

    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.fetchData(pageNumber);
    };

    render() {
        return (
            <div className="bg-light container-fluid w-100 h-100">
                <h1 className="text-center">Список клиентов</h1>

                <nav aria-label="Page navigation" className="mx-auto">
                    <Pagination activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={this.state.totalPages < 5 ? this.state.totalPages: 5}
                                onChange={this.handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                innerClass="pagination justify-content-center"
                    />
                </nav>

                <CustomersList customers={this.state.customers}/>
            </div>)

    }
}

import React, {Component} from 'react';
import './companies.css';
import ListOrders from '../list-of-company-orders/company-orders';
import SortList from '../list-of-company-orders/sort-list';

export default class ListOfCompanyOrders extends Component {

    orders = [{
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
        }];
    sorting = ["status", "type"];

    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Active orders</b></h3>
                <SortList sort={this.sorting}/>
                <ListOrders companies={this.orders}/>
            </div>
        );
    }
};
import React, {Component} from 'react';
import './companies.css';
import CompaniesList from '../companies/companies-list';
import SortList from '../companies/sort-list';

export default class Companies extends Component {

    companies = [{
        id: "1",
        logotype: "logo",
        name: "GoldService",
        address: "Kirova",
        ranking: "4 stars",
        price: "100$"
    },
        {
            id: "2",
            logotype: "logo",
            name: "SilverService",
            address: "Sovetskaya",
            ranking: "5 stars",
            price: "300$"
        },
        {
            id: "3",
            logotype: "logo",
            name: "BronzeService",
            address: "Lenina",
            ranking: "3 stars",
            price: "200$"
        }];

    sorting = ["price", "remoteness", "ranking"];

    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Available services</b></h3>
                <SortList sort={this.sorting}/>
                <CompaniesList companies={this.companies}/>

            </div>
        );
    }
};
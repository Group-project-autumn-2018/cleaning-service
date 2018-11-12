import React, {Component} from 'react';
import './companies.css';
import CompaniesList from "../companies/companies-list";

export default class Companies extends Component {

    companies = [{
        id: "1",
        logotype: "logo",
        companyname: "GoldService",
        address: "Kirova",
        ranking: "4 stars",
        price: "100$"
    },
        {
            id: "2",
            logotype: "logo",
            companyname: "SilverService",
            address: "Sovetskaya",
            ranking: "5 stars",
            price: "300$"
        },
        {
            id: "3",
            logotype: "logo",
            companyname: "BronzeService",
            address: "Lenina",
            ranking: "3 stars",
            price: "200$"
        }];

    render() {
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>List of available services by specified criteria</b></h3>

                <CompaniesList companies={this.companies}/>

            </div>
        );
    }
};
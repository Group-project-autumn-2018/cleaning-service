import React, {Component} from 'react';
import './companies.css';
import CompaniesList from '../companies/companies-list';
import SortList from '../companies/sort-list';
import connect from "react-redux/es/connect/connect";

class Companies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cleaningType: "",
            smallRoomsCount: "",
            bigRoomsCount: "",
            bathroomsCount: "",
            address: "",
            latitude: "",
            longitude: "",
            email: ""
        }
    }

    sorting = ["price", "remoteness", "ranking"];

    render() {
        console.log(orderDTO);
        return (
            <div id="companies-list" className="bg-light container-fluid w-100 h-100">
                <h3 className="text-center pt-4"><b>Available services</b></h3>
                <SortList sort={this.sorting}/>
                <CompaniesList companies={this.companies}/>
            </div>
        );
    }
}

const orderDTO = {
    cleaningType: this.props.orderUpdate.cleaningType,
    smallRoomsCount: this.props.orderUpdate.smallRoomsCount,
    bigRoomsCount: this.props.orderUpdate.bigRoomsCount,
    bathroomsCount: this.props.orderUpdate.bathroomsCount,
    address: this.props.orderUpdate.address,
    latitude: this.props.orderUpdate.updatedOrder.lat,
    longitude: this.props.orderUpdate.updatedOrder.lon,
    email: this.props.orderUpdate.email
};

const mapStateToProps = (state) => {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(Companies);

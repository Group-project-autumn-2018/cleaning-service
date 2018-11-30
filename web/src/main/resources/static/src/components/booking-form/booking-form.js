import React, {Component} from 'react';
import {connect} from 'react-redux';
import './booking-form.css';
import SelectItemsList from "./select-items-list";
import DropdownAddressList from "../service-profile/dropdown-address-list";
import {Link} from "react-router-dom";
import * as orderActions from "../actions/order-actions";
import OpenStreetMapApi from "../services/openstreetmap-api";

class BookingForm extends Component {

    openStreetMapApi = new OpenStreetMapApi();

    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            address: '',
            cleaningType: '',
            smallRoomsCount: '',
            bigRoomsCount: '',
            bathroomsCount: '',
            cleaningDay: '',
            cleaningTime: '',
            frequency: '',
            duration: '',
            email: this.props.email,
            estimatedPrice: 120,
            estimatedTime: '',
            addresses: []
        }
    }

    // changeAddress = (event) => {
    //     this.setState({address: event.target.value});
    // };

    changeCleaningType = (event) => {
        this.setState({cleaningType: event.target.value});
    };

    changeSmallRooms = (event) => {
        this.setState({smallRoomsCount: event.target.value});
    };

    changeBigRooms = (event) => {
        this.setState({bigRoomsCount: event.target.value});
    };

    changeBathrooms = (event) => {
        this.setState({bathroomsCount: event.target.value});
    };

    changeCleaningDay = (event) => {
        console.log(event.target);
        console.log(event.target.value);
        this.setState({cleaningDay: event.target.value});
    };

    changeCleaningFrequency = (event) => {
        this.setState({frequency: event.target.value});
    };

    changeTransactionDuration = (event) => {
        this.setState({duration: event.target.value});
    };

    changeCleaningTime = (event) => {
        this.setState({cleaningTime: event.target.value});
    };

    changEmail = (event) => {
        this.setState({email: event.target.value});
    };

    onSubmit = () => {
        if (this.props.id) {
            this.props.updateOrder({...this.state, customer: this.props.id})
        } else {
            this.props.updateOrder({...this.state})
        }
    };

    onChangeHandler = (e) => {
        this.setState({address: e.target.value});
        const name = e.target.name;
        if (name === 'address' && e.target.value.length > 5) {
            this.openStreetMapApi.getAddress(e.target.value).then(response => this.setState({addresses: response}));
        }
    };

    onClickAddressHandler = (event) => {
        const address = this.state.addresses.find(address => address.place_id === event.target.id);
        const updatedOrder = {
            ...this.state,
            lat: address.lat,
            lon: address.lon
        };
        console.log(address.lat + ' ' + address.lon);
        this.setState({updatedOrder, addresses: []});
    };


    frequency = ["once", "weekly", "fortnightly", "monthly"];
    duration = ["one month", "two month", "three month", "four month", "five month", "six month"];

    time = ["Not chosen...", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
        "17:30", "18:00"];

    types = ["Not chosen...", "Standard room cleaning", "Spring-cleaning", "Cleaning after repair and construction",
        "Dry carpet cleaning", "Office cleaning", "Dry cleaning of furniture and coatings",
        "Industrial cleaning", "Pool cleaning"];

    render() {
        console.log(this.state);
        return (
            <div className='text-center booking-component container'>
                <div className="overlay"/>
                <form className="form-booking card person-card">
                    <h3 className=""><b>Booking form</b></h3>

                    <div className="bookingRow">
                        <div className="form-group">
                            <label htmlFor="address" className="col-form-label">Address</label>
                            <div className="col-sm-8 dropdown">
                                <input type="text" className="form-control dropdown-toggle long" id="profileFormAddress"
                                       data-toggle="dropdown" placeholder="Your address..."
                                       name="address"
                                    // value={}`
                                       onChange={this.onChangeHandler}/>
                                <DropdownAddressList array={this.state.addresses}
                                                     onClickHandler={this.onClickAddressHandler}/>
                            </div>
                        </div>
                        <SelectItemsList array={this.types} label={"Cleaning type"} className={"long"}
                                         id={"cleaningType"} onChange={this.changeCleaningType}/>
                    </div>

                    <div className="bookingRow">
                        <div className="form-group">
                            <label htmlFor="smallRooms" className="col-form-label">Small rooms</label>
                            <input type="text" id="smallRooms" className="form-control short"
                                   placeholder="under 20 m²" required autoFocus onChange={this.changeSmallRooms}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bigRooms" className="col-form-label">Big rooms</label>
                            <input type="text" id="bigRooms" className="form-control short"
                                   placeholder="over 20 m²" required autoFocus onChange={this.changeBigRooms}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bathrooms" className="col-form-label">Bathrooms</label>
                            <input type="text" id="bathrooms" className="form-control short"
                                   placeholder="number of bathrooms..." required autoFocus
                                   onChange={this.changeBathrooms}/>
                        </div>
                    </div>

                    <div className="bookingRow">
                        <div className="form-group">
                            <label htmlFor="cleaningDays" className="col-form-label">Choose day for cleaning:</label>
                            <input type="date" id="cleaningDays" className="form-control long" required autoFocus
                                   onChange={this.changeCleaningDay}/>
                        </div>
                        <SelectItemsList array={this.frequency} label={"Planned cleaning frequency:"} className={"long"}
                                         id={"cleaningFrequency"} onChange={this.changeCleaningFrequency}/>
                    </div>

                    <div>
                        {this.props.isAuthenticated ?
                            <div className="bookingRow">
                                <SelectItemsList array={this.duration} label={"Transaction duration"} className={"long"}
                                                 id={"duration"}
                                                 onChange={this.changeTransactionDuration}/>
                                <SelectItemsList array={this.time} label={"Cleaning Time"} className={"long"}
                                                 id={"cleaningTime"} onChange={this.changeCleaningTime}/>
                            </div>
                            :
                            <div className="bookingRow">
                                <SelectItemsList array={this.duration} label={"Transaction duration"}
                                                 className={"short"} id={"duration"}
                                                 onChange={this.changeTransactionDuration}/>
                                <SelectItemsList array={this.time} label={"Cleaning Time"} className={"short"}
                                                 id={"cleaningTime"} onChange={this.changeCleaningTime}/>

                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input type="email" className="form-control short" id="email"
                                           placeholder="example@gmail.com" required onChange={this.changEmail}/>
                                    <div className="email-feedback"/>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="confirm" onClick={this.onSubmit}>
                        <Link to="/companies" className="btn btn-lg btn-primary btn-block btnProposals" type="submit">
                            Consider proposals
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: (order) => {
            dispatch(orderActions.prepareOrderForUpdate(order))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
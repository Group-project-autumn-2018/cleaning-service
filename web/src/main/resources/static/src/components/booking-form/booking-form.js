import React, {Component} from 'react';
import {connect} from 'react-redux';
import './booking-form.css';
import SelectItemsList from "./select-items-list";
import {Link} from "react-router-dom";
import * as orderActions from "../actions/order-actions";

class BookingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            address: '',
            cleaningType: '',
            smallRooms: '',
            bigRooms: '',
            bathrooms: '',
            cleaningDay: '',
            cleaningTime: '',
            frequency: '',
            duration: '',
            email: '',
            estimatedPrice: 120,
            estimatedTime: ''
        }
    }

    changeAddress = (event) => {
        this.setState({address: event.target.value});
    };

    changeCleaningType = (event) => {
        this.setState({cleaningType: event.target.value});
    };

    changeSmallRooms = (event) => {
        this.setState({smallRooms: event.target.value});
    };

    changeBigRooms = (event) => {
        this.setState({bigRooms: event.target.value});
    };

    changeBathrooms = (event) => {
        this.setState({bathrooms: event.target.value});
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

    frequency = ["ONLY_ONCE", "EVERY_WEEK", "EVERY_TWO_WEEKS", "EVERY_MONTH"];
    duration = ["ONE_MONTH", "TWO_MONTH", "THREE_MONTH", "FOUR_MONTH", "FIVE_MONTH", "SIX_MONTH"];
    time = ["Not chosen...", "9-00 AM", "9-30 AM", "10-00 AM", "10-30 AM", "11-00 AM", "11-30 AM", "12-00 AM", "12-30 AM",
        "13-00 AM", "13-30 AM", "14-00 AM", "14-30 AM", "15-00 AM", "15-30 AM", "16-00 AM", "16-30 AM", "17-00 AM",
        "17-30 AM", "18-00 AM"];
    types = ["Not chosen...", "Standard room cleaning", "Spring-cleaning", "Cleaning after repair and construction",
        "Dry carpet cleaning", "Office cleaning", "Dry cleaning of furniture and coatings",
        "Industrial cleaning", "Pool cleaning"];

    render() {
        return (
            <div className='text-center booking-component container'>
                <div className="overlay"/>
                <form className="form-booking card person-card">
                    <h3 className=""><b>Booking form</b></h3>

                    <div className="bookingRow">
                        <div className="form-group">
                            <label htmlFor="address" className="col-form-label">Address</label>
                            <input type="text" id="address" className="form-control long" placeholder="Your address..."
                                   required autoFocus onChange={this.changeAddress}/>
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
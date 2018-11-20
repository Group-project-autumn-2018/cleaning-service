import React, {Component} from 'react';
import {connect} from 'react-redux';
import './booking-form.css';
import SelectItemsList from "./select-items-list";
import {Link} from "react-router-dom";


class BookingForm extends Component {

    frequency = ["Only once", "Every week", "Every two weeks", "Every month"];
    duration = ["None", "One month", "Two month", "Three month", "Four month", "Five month", "Six month"];
    time = ["9-00 AM", "9-30 AM", "10-00 AM", "10-30 AM", "11-00 AM", "11-30 AM", "12-00 AM", "12-30 AM",
        "13-00 AM", "13-30 AM", "14-00 AM", "14-30 AM", "15-00 AM", "15-30 AM", "16-00 AM", "16-30 AM", "17-00 AM",
        "17-30 AM", "18-00 AM"];
    types = ["Standard room cleaning", "Spring-cleaning", "Cleaning after repair and construction",
        "Dry carpet cleaning", "Office cleaning", "Dry cleaning of furniture and coatings",
        "Industrial cleaning", "Pool cleaning"];

    render() {
        return (
            <div className='text-center booking-component container'>
                <div className="overlay"/>
                <form className="form-booking card person-card">
                    <h3 className=""><b>Booking form</b></h3>

                    <div className="long-inputs">
                        <div className="form-group">
                            <label htmlFor="address" className="col-form-label">Address</label>
                            <input type="text" id="address" className="form-control" placeholder="Your address..."
                                   required autoFocus/>
                        </div>
                        <SelectItemsList array={this.types} label={"Cleaning type"}/>
                    </div>

                    <div className="rooms">
                        <div className="form-group">
                            <label htmlFor="smallRooms" className="col-form-label">Small rooms</label>
                            <input type="text" id="smallRooms" className="form-control row-2"
                                   placeholder="under 20 m²" required autoFocus/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bigRooms" className="col-form-label">Big rooms</label>
                            <input type="text" id="bigRooms" className="form-control row-2"
                                   placeholder="over 20 m²" required autoFocus/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bathrooms" className="col-form-label">Bathrooms</label>
                            <input type="text" id="bathrooms" className="form-control row-2"
                                   placeholder="number of bathrooms..." required autoFocus/>
                        </div>
                    </div>

                    <div className="long-inputs">
                        <div className="form-group">
                            <label htmlFor="cleaningDays" className="col-form-label">Choose day for cleaning:</label>
                            <input type="date" id="cleaningDays" className="form-control " required autoFocus/>
                        </div>
                        <SelectItemsList array={this.frequency} label={"Planned cleaning frequency:"}/>
                    </div>

                    <div className="fourth-row">
                        {this.isAuthenticated ?
                            <div>
                                <SelectItemsList array={this.duration} label={"Transaction duration"}
                                                 className={"row-5"}/>
                                <SelectItemsList array={this.time} label={"Estimated time"} className={"row-5"}/>
                            </div>
                            :
                            <div>
                                <SelectItemsList array={this.duration} label={"Transaction duration"}
                                                 className={"row-5"}/>
                                <SelectItemsList array={this.time} label={"Estimated time"} className={"row-5"}/>


                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                    <input type="email" className="form-control row-5" id="email"
                                           placeholder="example@gmail.com" required/>
                                    <div className="email-feedback"/>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="confirm">
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
        ...state.user.isAuthenticated
    }
};

export default connect(mapStateToProps)(BookingForm);
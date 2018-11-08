import React, {Component} from 'react';
import './booking-form.css';
import EstimatedTimeList from './estimated-time-list';
import TransactionDurationList from './transaction-duration-list';
import CleaningFrequencyList from './cleaning-frequency-list';
import DaysForCleaningList from './days-for-cleaning-list';
import CleaningTypesList from "./cleaning-types-list";


export default class BookingForm extends Component {
    render() {
        return (
            <div className='text-center booking-component container'>
                <div className="overlay"/>
                <form className="form-booking card person-card">
                    <h3 className=""><b>Booking form</b></h3>

                    <div className="first-row">
                        <div className="form-group">
                            <label htmlFor="address" className="col-form-label">Address</label>
                            <input type="text" id="address" className="form-control" placeholder="Your address..."
                                   required
                                   autoFocus/>
                        </div>
                        <CleaningTypesList/>
                    </div>

                    <div className="second-row">
                        <div className="form-group">
                            <label htmlFor="smallRooms" className="col-form-label">Small rooms</label>
                            <input type="text" id="smallRooms" className="form-control row-2"
                                   placeholder="number of small rooms..." required
                                   autoFocus/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bigRooms" className="col-form-label">Big rooms</label>
                            <input type="text" id="bigRooms" className="form-control row-2"
                                   placeholder="number of big rooms..." required
                                   autoFocus/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bathrooms" className="col-form-label">Bathrooms</label>
                            <input type="text" id="bathrooms" className="form-control row-2"
                                   placeholder="number of bathrooms..." required
                                   autoFocus/>
                        </div>
                    </div>

                    <p className="title"><b>Choose days for cleaning:</b></p>
                    <DaysForCleaningList/>

                    <p className="title"><b>Planned cleaning frequency:</b></p>
                    <CleaningFrequencyList/>

                    <div className="fifth-row">
                        <TransactionDurationList/>
                        <EstimatedTimeList/>

                        <div className="form-group">
                            <label htmlFor="email" className="col-form-label">Email</label>
                            <input type="email" className="form-control row-5" id="email"
                                   placeholder="example@gmail.com" required/>
                            <div className="email-feedback"/>
                        </div>
                    </div>

                    <div className="confirm">
                        <button className="btn btn-lg btn-primary btn-block btnProposals" type="submit">
                            Consider proposals
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};
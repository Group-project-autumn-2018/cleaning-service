import React, {Component} from 'react';
import './booking-form.css';


export default class BookingForm extends Component {
    render() {
        return (
            <div className='text-center booking-component container'>
                <div className="overlay"></div>
                <form className="form-booking card person-card">
                    <h3 className=""><b>Application for cleaning service</b></h3>

                    <div className="first-row">
                        <div className="form-group">
                            <label htmlFor="address" className="col-form-label">Address</label>
                            <input type="text" id="address" className="form-control" placeholder="Your address..."
                                   required
                                   autoFocus/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cleaningType" className="col-form-label">Cleaning type</label>
                            <select className="form-control" id="cleaningType" placeholder="Cleaning type">
                                <option value="Standard room cleaning">Standard room cleaning</option>
                                <option value="Spring-cleaning">Spring-cleaning</option>
                                <option value="Cleaning after repair and construction">Cleaning after repair and
                                    construction
                                </option>
                                <option value="Dry carpet cleaning">Dry carpet cleaning</option>
                                <option value="Office Cleaning">Office cleaning</option>
                                <option value="Dry cleaning of furniture and coatings">Dry cleaning of furniture and
                                    coatings
                                </option>
                                <option value="Industrial cleaning">Industrial cleaning</option>
                                <option value="Pool cleaning">Pool cleaning</option>
                            </select>
                        </div>
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

                    <div className="checkbox mb-3 third-row">
                        <label>
                            <input type="checkbox" value="monday"/> Monday
                        </label>
                        <label>
                            <input type="checkbox" value="tuesday"/> Tuesday
                        </label>
                        <label>
                            <input type="checkbox" value="wednesday"/> Wednesday
                        </label>
                        <label>
                            <input type="checkbox" value="thursday"/> Thursday
                        </label>
                        <label>
                            <input type="checkbox" value="friday"/> Friday
                        </label>
                        <label>
                            <input type="checkbox" value="saturday"/> Saturday
                        </label>
                        <label>
                            <input type="checkbox" value="sunday"/> Sunday
                        </label>
                    </div>

                    <p className="title"><b>Planned cleaning frequency:</b></p>

                    <div className="checkbox mb-3 fourth-row">
                        <label>
                            <input type="checkbox" value="only once"/> Only once
                        </label>
                        <label>
                            <input type="checkbox" value="every week"/> Every week
                        </label>
                        <label>
                            <input type="checkbox" value="every two weeks"/> Every two weeks
                        </label>
                        <label>
                            <input type="checkbox" value="every month"/> Every month
                        </label>
                    </div>

                    <div className="fifth-row">
                        <div className="form-group">
                            <label htmlFor="transactionDuration" className="col-form-label">Transaction duration</label>
                            <select className="form-control row-5" id="transactionDuration"
                                    placeholder="transaction duration...">
                                <option value="One month">One month</option>
                                <option value="wo month">Two month</option>
                                <option value="Three month">Three month</option>
                                <option value="Four month">Four month</option>
                                <option value="Five month">Five month</option>
                                <option value="Six month">Six month</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="estimatedStartTime" className="col-form-label">Estimated start time</label>
                            <select className="form-control row-5" id="estimatedStartTime"
                                    placeholder="estimated start time...">
                                <option value="9-00 AM">9-00 AM</option>
                                <option value="9-30 AM">9-30 AM</option>
                                <option value="10-00 AM">10-00 AM</option>
                                <option value="10-30 AM">10-30 AM</option>
                                <option value="11-00 AM">11-00 AM</option>
                                <option value="11-30 AM">11-30 AM</option>
                                <option value="12-00 AM">12-00 AM</option>
                                <option value="12-30 PM">12-30 PM</option>
                                <option value="13-00 PM">13-00 PM</option>
                                <option value="13-30 PM">13-30 PM</option>
                                <option value="14-00 PM">14-00 PM</option>
                                <option value="14-30 PM">14-30 PM</option>
                                <option value="15-00 PM">15-00 PM</option>
                                <option value="15-30 PM">15-30 PM</option>
                                <option value="16-00 PM">16-00 PM</option>
                                <option value="16-30 PM">16-30 PM</option>
                                <option value="17-00 PM">17-00 PM</option>
                                <option value="17-30 PM">17-30 PM</option>
                                <option value="18-00 PM">18-00 PM</option>
                            </select>
                        </div>

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
                    <p className="mt-5 mb-3 copy">&copy; 2018</p>
                </form>
            </div>
        );
    }
};
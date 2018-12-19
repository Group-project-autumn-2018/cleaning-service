import React, {Component} from 'react';
import {connect} from 'react-redux';
import './booking-form.css';
import SelectItemsList from "./select-items-list";
import DropdownAddressList from "../service-profile/dropdown-address-list";
import {withRouter} from "react-router-dom";
import * as orderActions from "../actions/order-actions";
import OpenStreetMapApi from "../services/openstreetmap-api";
import CustomerApi from "../services/customer-api";
import ConfirmModalToggleButton from "../companies/confirm-modal-toggle-button";
import CustomerConfirmModalForm from "../companies/customer-confirm-modal-form";
import {fetchCustomerSuccess, fetchEntity} from "../api/api-actions";

class BookingForm extends Component {

    company = {};
    openStreetMapApi = new OpenStreetMapApi();
    customerApiService = new CustomerApi();

    entityURN = '/cleaning/search/companies';

    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            address: {
                address: '',
                lat: '',
                lon: ''
            },
            companyName: '',
            cleaningType: this.types[0],
            smallRoomsCount: 0,
            bigRoomsCount: 0,
            bathroomsCount: 0,
            cleaningDay: '',
            cleaningTime: this.time[0],
            frequency: this.frequency[0],
            duration: this.duration[0],
            email: this.props.email,
            price: '',
            estimatedTime: '',
            addresses: [],
            smallRoomsError: false,
            bigRoomsError: false,
            bathroomsError: false,
            addressExists: false
        }
    }

    componentDidMount() {
        if (this.props.id) {
            fetchEntity(this.props.id, "/customer", this.props.token)
                .then((customer) => {
                    this.props.fetchCustomerSuccess(customer);
                    if (customer.address.address) {
                        this.setState({address: customer.address, addressExists: true})
                    }
                });
        }
    }

    changeType = (event) => {
        this.setState({cleaningType: event.target.value});
    };

    changeSmallRooms = (event) => {
        let value = event.target.value;
        if (value.length > 3) {
            event.target.classList.add('invalid');
            this.setState({smallRoomsError: true})
        } else {
            event.target.classList.remove('invalid');
            this.setState({smallRoomsError: false})
        }
        this.setState({smallRoomsCount: event.target.value});
    };

    changeBigRooms = (event) => {
        let value = event.target.value;
        if (value.length > 3) {
            event.target.classList.add('invalid');
            this.setState({bigRoomsError: true})
        } else {
            event.target.classList.remove('invalid');
            this.setState({bigRoomsError: false})
        }
        this.setState({bigRoomsCount: event.target.value});
    };

    changeBathrooms = (event) => {
        let value = event.target.value;
        if (value.length > 3) {
            event.target.classList.add('invalid');
            this.setState({bathroomsError: true})
        } else {
            event.target.classList.remove('invalid');
            this.setState({bathroomsError: false})
        }
        this.setState({bathroomsCount: event.target.value});
    };

    changeCleaningDay = (event) => {
        this.setState({cleaningDay: event.target.value});
    };

    changeCleaningFrequency = (event) => {
        this.setState({frequency: event.target.value});
    };

    changeTransactionDuration = (event) => {
        this.setState({duration: event.value});
    };

    changeCleaningTime = (event) => {
        console.log(event);
        this.setState({cleaningTime: event.value});
    };

    changeEmail = (event) => {
        this.setState({email: event.target.value});
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (!this.state.smallRoomsError && !this.state.bigRoomsError && !this.state.bathroomsError) {
            if (this.props.id) {
                this.props.updateOrder({...this.state, customer: this.props.id});
                this.props.history.push("/companies")
            } else {
                this.props.updateOrder({...this.state});
                this.props.history.push("/companies")
            }
        }
    };

    bookingConfirm = () => {
        const searchCompanyDto = {
            cleaningType: this.state.cleaningType,
            smallRoomsCount: this.state.smallRoomsCount,
            bigRoomsCount: this.state.bigRoomsCount,
            bathroomsCount: this.state.bathroomsCount,
            address: this.props.isAuthenticated ? this.props.address.address : this.props.orderUpdate.address.address,
            latitude: this.props.isAuthenticated ? this.props.address.lat : this.props.orderUpdate.address.lat,
            longitude: this.props.isAuthenticated ? this.props.address.lon : this.props.orderUpdate.address.lon,
            email: this.props.orderUpdate.email,
            price: "",
            estimatedTime: "",
            sort: ""
        };
        this.fetchCompaniesPOST(searchCompanyDto, this.entityURN, this.props.token).then((companies) => {
            const id = this.props.companyId;
            this.company = companies.filter(company => (company.id !== undefined && company.id == id))[0];
            console.log(this.company);
            if (!this.state.smallRoomsError && !this.state.bigRoomsError && !this.state.bathroomsError) {
                this.props.updateOrder({
                    ...this.state, customer: this.props.id,
                    company: this.company.id,
                    companyName: this.company.username,
                    price: this.company.averagePrice,
                    estimatedTime: this.company.estimatedTime,
                    address: this.props.address
                })
            }
        });
    };

    async fetchCompaniesPOST(entity, entityURN, token) {
        let header = {
            'Content-Type': 'application/json'
        };

        if (token) {
            header = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        let options = {
            headers: header,
            method: 'POST',
            body: JSON.stringify(entity)
        };
        return await fetch(`/api${entityURN}`, options).then(resolve => resolve.json());
    };

    onChangeHandler = (e) => {
        this.setState({address: {...this.state.address, address: e.target.value}});
        const name = e.target.name;
        if (name === 'address' && e.target.value.length > 5) {
            this.openStreetMapApi.getAddress(e.target.value).then(response => this.setState({addresses: response}));
        }
    };

    onClickAddressHandler = (event) => {
        const address = this.state.addresses.find(address => address.place_id === event.target.id);
        const updatedOrder = {
            ...this.state,
            address: {...this.state.address, lat: address.lat, lon: address.lon}
        };
        this.setState({...updatedOrder, addresses: []});
    };


    frequency = ["once", "weekly", "fortnightly", "monthly"];
    duration = ["one month", "two month", "three month", "four month", "five month", "six month"];

    time = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
        "17:30", "18:00"];

    types = ["Standard room cleaning", "Spring cleaning", "Cleaning after repair and construction",
        "Dry carpet cleaning", "Office cleaning", "Dry cleaning of furniture and coatings",
        "Industrial cleaning", "Pool cleaning"];

    render() {
        return (
            <div className='text-center booking-component container'>
                <div className="overlay"/>
                <form className="form-booking card person-card" onSubmit={this.onSubmit}>
                    <h3 className=""><b>Booking form</b></h3>

                    <div className="bookingRow">

                        <div className="form-group">
                            <label htmlFor="address" className="col-form-label">Address</label>
                            {this.state.addressExists ?

                                <div className="col-sm-8 dropdown">
                                    <div>
                                        <input type="text" className="form-control long"
                                               id="bookingFormAddress" placeholder="Your address..."
                                               name="address"
                                               value={this.state.address.address}
                                               disabled={true}
                                        />
                                    </div>
                                </div>
                                :
                                <div className="col-sm-8 dropdown">
                                    <input type="text" className="form-control dropdown-toggle long"
                                           id="profileFormAddress"
                                           data-toggle="dropdown" placeholder="Your address..."
                                           name="address" required={true}
                                           onChange={this.onChangeHandler}/>
                                    <DropdownAddressList array={this.state.addresses}
                                                         onClickHandler={this.onClickAddressHandler}/>
                                </div>
                            }
                        </div>

                        <SelectItemsList array={this.types} label={"Cleaning type"} className={"long"}
                                         id={"cleaningType"} onChange={this.changeType}/>
                    </div>

                    <div className="bookingRow">
                        <div className="form-group">
                            <label htmlFor="smallRooms" className="col-form-label">Small rooms</label>
                            <input type="number" id="smallRooms" className="form-control short"
                                   placeholder="under 20 m²" autoFocus
                                   onChange={this.changeSmallRooms}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bigRooms" className="col-form-label">Big rooms</label>
                            <input type="number" id="bigRooms" className="form-control short"
                                   placeholder="over 20 m²" autoFocus onChange={this.changeBigRooms}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bathrooms" className="col-form-label">Bathrooms</label>
                            <input type="number" id="bathrooms" className="form-control short"
                                   placeholder="number of bathrooms..." autoFocus
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
                                           placeholder="example@gmail.com" required={true} onChange={this.changeEmail}/>
                                    <div className="email-feedback"/>
                                </div>
                            </div>
                        }
                    </div>

                    <div>
                        {this.props.companyId ?
                            <div className="confirm">
                                <ConfirmModalToggleButton onClick={this.bookingConfirm}/>
                            </div>
                            :
                            <div className="confirm">
                                <button className="btn btn-lg btn-primary btn-block btnProposals" type="submit">
                                    Consider proposals
                                </button>
                            </div>
                        }
                    </div>
                </form>
                <CustomerConfirmModalForm/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.user,
        customer: state.customer,
        orderUpdate: state.orderUpdate,
        companies: state.entities
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: (order) => {
            dispatch(orderActions.prepareOrderForUpdate(order))
        },
        fetchCustomerSuccess: (payload) => {
            dispatch(fetchCustomerSuccess(payload));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingForm));

import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {fetchEntity} from "../api/api-actions";
import {connect} from "react-redux";
import Rating from 'react-rating';
import FeedbackList from './feedback-list';
import './service-info.css';
import Pagination from "react-js-pagination";


class ServiceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: {
                address: {},
                cleaningTypes: {}
            },
            feedbackList: [],
            page: 0,
            totalElements: 0,
            totalPages: 0
        }
    }

    componentDidMount() {
        fetchEntity(this.props.itemId, "/cleaning", this.props.token)
            .then((service) => {
                this.setState({service: service})
            });
        fetchEntity(`feedback?size=5&page=${this.state.page}&service-id=${this.props.itemId}`, "/cleaning", this.props.token)
            .then((page) => {
                this.setState({feedbackList: page.content, page: page.number, totalElements: page.totalElements,
                    totalPages: page.totalPages})
            });
    }

    handlePageChange = (page) => {
        fetchEntity(`feedback?size=5&page=${page - 1}&service-id=${this.props.itemId}`, "/cleaning", this.props.token)
            .then((page) => {
                this.setState({feedbackList: page.content, page: page.number, totalElements: page.totalElements,
                    totalPages: page.totalPages})
            });
    };

    render() {
        return (
            <div className="container">
                <div className="card service-info">
                    <div className="card-img-block">
                        <img className="img-fluid"
                             src="http://www.picpedia.org/handwriting/images/cleaning.jpg"
                             alt="Card image cap"/>
                    </div>
                    <div className="card-body pt-5">
                        <img src={`/api/cleaning/${this.props.itemId}/image`} alt="logo-image" className="logo"/>
                        <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" readonly={true}
                                initialRating={this.state.service.averageRating}/>
                        <h4 className="card-title">Username: {this.state.service.username}</h4>
                        <p className="card-text">Description: {this.state.service.description}</p>
                        <p className="card-text">Address: {this.state.service.address.address}</p>
                        {this.state.service.cleaningTypes.dryCarpetCleaning ?
                            <p className="card-text">Dry carpet cleaning. Cost:
                                {this.state.service.cleaningTypes.price.dryCarpetCleaning} </p> : null}
                        {this.state.service.cleaningTypes.furnitureAndCoatingsCleaning ?
                            <p className="card-text">Furniture and coatings cleaning. Cost:
                                {this.state.service.cleaningTypes.price.furnitureAndCoatingsCleaning} </p> : null}
                        {this.state.service.cleaningTypes.industrialCleaning ?
                            <p className="card-text">Industrial cleaning. Cost:
                                {this.state.service.cleaningTypes.price.industrialCleaning} </p> : null}
                        {this.state.service.cleaningTypes.officeCleaning ?
                            <p className="card-text">Office cleaning. Cost:
                                {this.state.service.cleaningTypes.price.officeCleaning} </p> : null}
                        {this.state.service.cleaningTypes.poolCleaning ?
                            <p className="card-text">Pool cleaning. Cost:
                                {this.state.service.cleaningTypes.price.poolCleaning} </p> : null}
                        {this.state.service.cleaningTypes.repairAndConstructionCleaning ?
                            <p className="card-text">Repair and construction cleaning. Cost:
                                {this.state.service.cleaningTypes.price.repairAndConstructionCleaning} </p> : null}
                        {this.state.service.cleaningTypes.standardRoomCleaning ?
                            <p className="card-text">Standard room cleaning. Cost:
                                {this.state.service.cleaningTypes.price.standardRoomCleaning} </p> : null}
                        {this.state.service.cleaningTypes.springCleaning ?
                            <p className="card-text">Spring cleaning. Cost:
                                {this.state.service.cleaningTypes.price.springCleaning} </p> : null}
                        <div>
                            <Link to="/booking" className="btn btn-primary">Book a cleaning</Link>
                            <Link to={`/company/${this.state.service.id}/feedback`}
                                  className="btn btn-primary float-right">
                                Left a feedback
                            </Link>
                        </div>
                    </div>
                </div>
                <FeedbackList array={this.state.feedbackList}/>
                <nav aria-label="Page navigation" className="mx-auto">
                    {this.state.totalElements > 0 ? <Pagination activePage={this.state.page + 1}
                                itemsCountPerPage={5}
                                totalItemsCount={this.state.totalElements}
                                pageRangeDisplayed={this.state.totalPages < 5 ? this.state.totalPages : 5}
                                onChange={this.handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                innerClass="pagination justify-content-center"/> : null}
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
};

export default withRouter(connect(mapStateToProps)(ServiceInfo));
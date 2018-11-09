import React, {Component} from 'react';
import Rating from 'react-rating';
import './feedback.css';
import ServiceApi from "../services/service-api";

export default class Feedback extends Component {
    serviceApi = new ServiceApi();

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            text: '',
            isRateCorrect: false,
            isTextCorrect: false
        }
    }

    changeRating = (rate) => {
        this.setState({rating: rate, isRateCorrect: true});
    };

    changeText = (event) => {
        this.setState({text: event.target.value});
        if (event.target.value.length === 0) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    sendFeedback = () => {
        if (this.validate()) {
            let obj = {
                rate: this.state.rating,
                text: this.state.text,
                serviceId: this.props.serviceId
            };
            this.serviceApi.sendFeedback(obj).then((status) => {
                    if (status === 202) {
                        console.log("successful");
                    }
                }
            )
        }
    };

    validate = () => {
        if (this.state.text === '') {
            this.setState({isRateCorrect: false});
            return false;
        } else {
            this.setState({isRateCorrect: true});
        }
        if (this.state.rating <= 0) {
            this.setState({isTextCorrect: false});
            return false;
        } else {
            this.setState({isTextCorrect: true});
        }
        return true;
    };

    render() {
        return (
            <div className="container feedback-form">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9 col-lg-8 pb-9">
                        <form>
                            <div className="card border-info">
                                <div className="card-header p-0">
                                    <div className="bg-info text-white text-center py-2">
                                        <h3><i className="fa fa-envelope"/> Feedback</h3>
                                        <h5>
                                            <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x"
                                                    onChange={this.changeRating} initialRating={this.state.rating}/>
                                        </h5>
                                        <p>{this.state.isRateCorrect ? null : 'You have to choose rate'}</p>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fa fa-comment text-info"/>
                                                </div>
                                            </div>
                                            <textarea className="form-control" placeholder="Write feedback..."
                                                      onChange={this.changeText} value={this.state.text}
                                                      required/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-info btn-lg py-2 float-right"
                                            onClick={this.sendFeedback}>
                                        <i className="fa fa-paper-plane-o" aria-hidden="true"/>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
import React, {Component} from 'react';
// import Rating from 'react-rating';
import './feedback.css';

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            text: ''
        }
    }

    changeRating = (rate) => {
        this.setState({rating: rate});
    };

    changeText = (event) => {
        this.setState({text: event.target.value});
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
                                    <button type="submit" className="btn btn-info btn-lg py-2 float-right">
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
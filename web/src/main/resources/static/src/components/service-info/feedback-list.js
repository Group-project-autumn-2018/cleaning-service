import React from 'react';
import Rating from "react-rating";

const FeedbackList = (props) => {
    const feedbackList = props.array.map((element) => {
        return (
            <div className="card border-info mb-3" key={element.id}>
            <div className="card-header">
                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x"
                        initialRating={element.rate} readonly={true} />
            </div>
            <div className="card-body text-info">
                <p className="card-text">{element.text}</p>
            </div>
        </div>
        )
    });
    return (
        <div className="card bg-light">
            <div className="card-header">Feedback</div>
            <div className="card-body">
                {props.array.length === 0 ? "No feedback": null}
                {feedbackList}
            </div>
        </div>
    )
};

export default FeedbackList;
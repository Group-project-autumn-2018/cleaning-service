import React from 'react';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';

const Msg = ({message}) => (
    <div>
        <i className="fa fa-check"></i>
        <span>You have a new order</span>
        <Link to={`/service/orders/${message}`} className="btn btn-success btn-sm">View details</Link>
    </div>
);


const notificationReducer = (state = '', action) => {

    switch (action.type) {
        case 'SHOW_NOTIFICATION': {
            toast(<Msg message={action.payload}/>);
            return action.payload;
        }
        default:
            return state;
    }
};

export default notificationReducer;
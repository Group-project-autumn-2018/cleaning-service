import React from 'react';
import Order from './order';


const OrdersList = ({orders}) => {
    const ordersList = orders.map(order =>
        <Order key={order.id} order={order}/>
    );
    return (
        <div className="container-fluid bg-light w-100 h-100">
            <table className="table table-hover">
                <tbody>
                <tr className="row px-5">
                    <th scope="col" className="col">Service Type</th>
                    <th scope="col" className="col">Address</th>
                    <th scope="col" className="col-2">Room Description</th>
                    <th scope="col" className="col">Cleaning Day</th>
                    <th scope="col" className="col">Cleaning Time</th>
                    <th scope="col" className="col">Frequency</th>
                    <th scope="col" className="col">Company</th>
                    <th scope="col" className="col">Price</th>
                    <th scope="col" className="col">Time</th>
                    <th scope="col" className="col">Status</th>
                </tr>
                {ordersList}
                </tbody>
            </table>
        </div>
    )
};

export default OrdersList;
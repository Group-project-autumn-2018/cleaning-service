import React from 'react';
import CustomerOrder from './customer-order';


const CustomerOrdersList = ({orders}) => {
    const ordersList = orders.map((order) =>
        <CustomerOrder key={order.id} order={order}/>
    );

    return (
        <div className="container">
            <table className="table table-hover">
                <tbody>
                <tr className="row">
                    <th scope="col" className="col">Cleaning Type</th>
                    <th scope="col" className="col">Address</th>
                    <th scope="col" className="col">Room Description</th>
                    <th scope="col" className="col">Day</th>
                    <th scope="col" className="col">Time</th>
                    <th scope="col" className="col">Frequency</th>
                    <th scope="col" className="col">Company</th>
                    <th scope="col" className="col">Estimated Price</th>
                    <th scope="col" className="col">Estimated Time</th>
                    <th scope="col" className="col">Status</th>
                </tr>
                {ordersList}
                </tbody>
            </table>
        </div>
    )
};
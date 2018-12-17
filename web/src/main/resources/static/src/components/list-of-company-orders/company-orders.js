import React from 'react';
import CompanyOrder from './company-order';

const CompanyOrders = ({orders}) => {
    const ordersList = orders.map((order) =>
        <CompanyOrder key={order.id} order={order}/>
    );

    return (
        <div className="container">
            <table className="table table-hover">
                <tbody>
                <tr className="row bg-light px-5" className="row">
                    <th  scope="col" className="col">Сleaning type</th>
                    <th  scope="col" className="col">Status</th>
                    <th  scope="col" className="col">Date</th>
                    <th  scope="col" className="col">Start Time</th>
                </tr>
                {ordersList}
                </tbody>
            </table>
        </div>
    )
};

export default CompanyOrders;
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
                    <th scope="col" className="col">Name</th>
                    <th scope="col" className="col">Email</th>
                    <th scope="col" className="col">Ban</th>
                    <th scope="col" className="col">Ban reason</th>
                    <th scope="col" className="col">Ban reason</th>
                    <th scope="col" className="col">Ban reason</th>
                    <th scope="col" className="col">Ban reason</th>
                    <th scope="col" className="col">Ban reason</th>
                    <th scope="col" className="col">Ban reason</th>
                    <th scope="col" className="col">Ban reason</th>
                    <th scope="col" className="col">Ban reason</th>
                </tr>
                {ordersList}
                </tbody>
            </table>
            <BanModal/>
        </div>
    )
};
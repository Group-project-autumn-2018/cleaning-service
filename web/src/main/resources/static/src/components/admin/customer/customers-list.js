import React from 'react';
import Customer from './customer';
import BanModal from './ban-modal';

const CustomersList = ({customers}) =>{
    const customersList = customers.map(customer =>
        <Customer key={customer.id} customer = {customer} />
    );
    return(
        <div className="container">
            <table className="table .table-hover">
                <tbody>
                <tr className="row">
                    <th scope="col" className="col">Name</th>
                    <th scope="col" className="col">Phone</th>
                    <th scope="col" className="col">Email</th>
                    <th scope="col" className="col">Ban</th>
                    <th scope="col" className="col">Ban reason</th>
                </tr>
                {customersList}
                </tbody>
            </table>
            <BanModal/>
        </div>
    )
};

export default CustomersList;
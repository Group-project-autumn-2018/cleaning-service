import React from 'react';
import Customer from './customer'

const CustomersList = ({customers}) =>{
    const customersList = customers.map(customer =>
        <Customer key={customer._links.self.href} customer = {customer}/>
    );
    return(
        <div className="container">
            <table className="table .table-hover">
                <tbody>
                <tr className="row">
                    <th scope="col" className="col">Имя</th>
                    <th scope="col" className="col">Телефон</th>
                    <th scope="col" className="col">Email</th>
                    <th scope="col" className="col">Блокировка</th>
                    <th scope="col" className="col">Причина блокировки</th>
                </tr>
                {customersList}
                </tbody>
            </table>
        </div>
    )
};

export default CustomersList;
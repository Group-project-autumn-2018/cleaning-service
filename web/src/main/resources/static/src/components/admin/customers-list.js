import React from 'react';
import Customer from './customer'

CustomersList = ({customers}) =>{
    const customersList = customers.map(customer =>
        <Customer key={customer._links.self.href} customer = {customer}/>
    );
    return(
        <div>
            <table>
                <tr>
                    <th>Имя</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th>Блокировка</th>
                    <th>Причина блокировки</th>
                </tr>
                {customersList}
            </table>
        </div>
    )
};

export default CustomersList;
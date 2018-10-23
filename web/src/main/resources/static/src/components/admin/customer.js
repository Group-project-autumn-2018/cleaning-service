import React from 'react';

const Customer = ({customer}) =>{
    return(
        <div>
            <tr>
                <td>{customer.username}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.bunned}</td>
                <td>{customer.bunReason}</td>
            </tr>
        </div>
    )

};

export default Customer;

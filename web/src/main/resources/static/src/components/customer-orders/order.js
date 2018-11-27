import React from 'react';

const Order = ({order}) => {

    return (
        <tr className="row">
            <td className="col">{order.cleaningType}</td>
            <td className="col">{order.address.address}</td>
            <td className="col-2">
                <ul>
                    <li>{`Small rooms ${order.smallRoomsCount}`}</li>
                    <li>{`Big rooms ${order.bigRoomsCount}`}</li>
                    <li>{`Bathrooms ${order.bathroomsCount}`}</li>
                </ul>
            </td>
            <td className="col">{order.cleaningDay}</td>
            <td className="col">{order.cleaningTime}</td>
            <td className="col">{`${order.frequency}(${order.duration})`}</td>
            <td className="col">{order.companyName}</td>
            <td className="col">{order.price}</td>
            <td className="col">{order.estimatedTime}</td>
            <td className="col">{order.status}</td>
        </tr>
    )
};


export default Order;
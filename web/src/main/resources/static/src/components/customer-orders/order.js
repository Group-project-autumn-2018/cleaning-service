import React from 'react';
import {Link} from "react-router-dom";

const Order = ({order}) => {

    let colorClassName = "col";

    switch (order.status) {
        case 'New':
            colorClassName = "col text-primary";
            break;
        case 'Confirmed':
            colorClassName = "col text-info";
            break;
        case 'Rejected':
            colorClassName = "col text-danger";
            break;
        case 'Completed':
            colorClassName = "col text-success";
            break;
    }

    return (
        <tr className="row bg-light px-5">
            <td className="col">{order.cleaningType}</td>
            <td className="col-2">{order.address.address ? order.address.address : order.address}</td>
            <td className="col-2">
                <ul>
                    {order.smallRoomsCount ? <li>{`Small rooms ${order.smallRoomsCount}`}</li> : ""}
                    {order.bigRoomsCount ? <li>{`Big rooms ${order.bigRoomsCount}`}</li> : ""}
                    {order.bathroomsCount ? <li>{`Bathrooms ${order.bathroomsCount}`}</li> : ""}
                </ul>
            </td>
            <td className="col">{order.cleaningDay}</td>
            <td className="col">{order.cleaningTime}</td>
            <td className="col">{`${order.frequency}(${order.duration})`}</td>
            <td className="col"><Link to={`/company/${order.company}`}>{order.companyName}</Link></td>
            <td className="col">{order.price}</td>
            <td className="col">{order.estimatedTime}</td>
            <td className={colorClassName}>{order.status}</td>
        </tr>
    )
};


export default Order;
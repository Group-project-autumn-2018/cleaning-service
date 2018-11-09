import React from 'react';
import {Link} from "react-router-dom";

const NavigationItem = (props) => {

    return (
        <li className="nav-item">
            <Link to={props.link} className="nav-link">{props.children}</Link>
        </li>
    )
};

export default NavigationItem;
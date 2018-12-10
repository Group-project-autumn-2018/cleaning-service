import React from "react";

const CompanySearchBar = (props) => {
    return (
        <div className="d-flex justify-content-around">

            <input type="text" placeholder="Company name" onChange={props.onChange}
                   className="search-item" name="company"/>
            <input type="text" placeholder="Types of provided service" onChange={props.onChange}
                   className="search-item" name="types"/>

            <button className="btn btn-primary search-item" onClick={props.onClick}>Search</button>

            <button className="btn btn-secondary" onClick={props.showAll}>Clear</button>

        </div>
    )
};

export default CompanySearchBar;
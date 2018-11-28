import React from 'react';

const SearchSortFilter = (props) => {

    const types = ["Not chosen...", "Standard room cleaning", "Spring-cleaning", "Cleaning after repair and construction",
        "Dry carpet cleaning", "Office cleaning", "Dry cleaning of furniture and coatings",
        "Industrial cleaning", "Pool cleaning"];

    const options = types.map(type =>
        <option key={type} value={type}>{type}</option>);

    return (
        <div className="d-flex justify-content-around">
            <select className="custom-select search-item" name="cleaningType" onChange={props.onChange}>
                <option value="" hidden selected disabled>Cleaning Type</option>
                {options}
            </select>
            <input type="text" placeholder="Address" onChange={props.onChange}
                   className="search-item" name="address"/>
            <input type="text" placeholder="Cleaning Company" onChange={props.onChange}
                   className="search-item" name="company"/>

            <button className="btn btn-primary search-item" onClick={props.onClick}>Search</button>

            <select className="custom-select search-item" name="sort" onChange={props.onChange}>
                <option value="" hidden selected disabled>Sort by</option>
                <option value="">Price</option>
                <option value="">Time</option>
                <option value="">Date</option>
            </select>
        </div>
    )
};

export default SearchSortFilter;
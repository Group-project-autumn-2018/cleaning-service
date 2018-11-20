import React from "react";

const SortList = (props) => {
    const listItems = props.sort.map((sort) =>
        <option key={sort.toString()} value={sort}>{sort}</option>
    );

    return (
        <div className="form-group">
            <label htmlFor="sortType" className="col-form-label"><b>Sort type</b></label>
            <select className="form-control" style={{width: 200 + 'px'}} id="sortType" placeholder="Sort type">
                {listItems}
            </select>
        </div>
    )
};

export default SortList;
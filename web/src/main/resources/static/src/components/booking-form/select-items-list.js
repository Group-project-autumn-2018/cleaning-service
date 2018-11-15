import React from "react";

const SelectItemsList = (props) => {
    const listItems = props.array.map((array) =>
        <option key={array.toString()} value={array}>{array}</option>
    );
    const className = props.className ? props.className : "";

    return (
        <div className="form-group">
            <label htmlFor="cleaningType" className="col-form-label">{props.label}</label>
            <select className={"form-control" + " " + className} id="cleaningType" placeholder="Cleaning type">
                {listItems}
            </select>
        </div>
    )
};

export default SelectItemsList;

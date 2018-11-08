import React from "react";

const CheckboxItemsList = (props) => {

    const listItems = props.array.map((array) =>
        <label key={array.toString()}>
            <input type="checkbox" value={array}/> {array}
        </label>
    );

    return (

        <div className="checkbox mb-3 fourth-row">{listItems}</div>
    )
};

export default CheckboxItemsList;







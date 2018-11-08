import React from "react";

const CleaningFrequencyList = () => {
    const frequency = ["Only once", "Every week", "Every two weeks", "Four month", "Every month"];
    const listItems = frequency.map((frequency) =>
        <label>
            <input type="checkbox" value={frequency}/> {frequency}
        </label>
    );

    return (

        <div className="checkbox mb-3 fourth-row">{listItems}</div>
    )
};

export default CleaningFrequencyList;







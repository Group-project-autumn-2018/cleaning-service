import React from "react";

const DaysForCleaningList = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const listItems = days.map((days) =>
        <label>
            <input type="checkbox" value={days}/> {days}
        </label>
    );

    return (

        <div className="checkbox mb-3 third-row">{listItems}</div>
    )
};

export default DaysForCleaningList;
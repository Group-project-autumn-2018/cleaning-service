import React from 'react';


const EstimatedTimeList = () => {
    const time = ["9-00 AM", "9-30 AM", "10-00 AM", "10-30 AM", "11-00 AM", "11-30 AM", "12-00 AM", "12-30 AM",
        "13-00 AM", "13-30 AM", "14-00 AM", "14-30 AM", "15-00 AM", "15-30 AM", "16-00 AM", "16-30 AM", "17-00 AM",
        "17-30 AM", "18-00 AM"];
    const listItems = time.map((time) =>
        <option value={time}>{time}</option>
    );

    return(

        <div className="form-group">
            <label htmlFor="estimatedStartTime" className="col-form-label">Estimated start time</label>
            <select className="form-control row-5" id="estimatedStartTime"
                    placeholder="estimated start time...">
                {listItems}
            </select>
        </div>
    )
};

export default EstimatedTimeList;


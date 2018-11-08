import React from 'react';

const TransactionDurationList = () => {
    const duration = ["One month", "Two month", "Three month", "Four month", "Five month", "Six month"];
    const listItems = duration.map((duration) =>
        <option value={duration}>{duration}</option>
    );

    return(

        <div className="form-group">
            <label htmlFor="transactionDuration" className="col-form-label">Transaction duration</label>
            <select className="form-control row-5" id="transactionDuration"
                    placeholder="estimated start time...">
                {listItems}
            </select>
        </div>
    )
};

export default TransactionDurationList;
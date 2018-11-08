import React from "react";

const CleaningTypesList = () => {
    const types = ["Standard room cleaning", "Spring-cleaning", "Cleaning after repair and construction",
        "Dry carpet cleaning", "Office cleaning", "Dry cleaning of furniture and coatings",
        "Industrial cleaning", "Pool cleaning"];
    const listItems = types.map((types) =>
        <option value={types}>{types}</option>
    );

    return(

        <div className="form-group">
            <label htmlFor="cleaningType" className="col-form-label">Cleaning type</label>
            <select className="form-control" id="cleaningType" placeholder="Cleaning type">
                {listItems}
            </select>
        </div>
    )
};

export default CleaningTypesList;

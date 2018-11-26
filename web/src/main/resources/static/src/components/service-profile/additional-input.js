import React from "react";
import './additional-input.css';

const AdditionalInput = (props) => {
    const placeholders = ['Price coefficient', 'Time'];
    const roomTypes = ['bathroomCleaningTime', 'smallRoomCleaningTime', 'bigRoomCleaningTime'];
    return (
        <div className="col-sm-6 d-flex flex-row">
            <input type="number" className="form-control col-sm-6" placeholder={placeholders[0]}
                   value={props.values[0]} name={props.names[0]} onChange={props.onChangePriceHandler}/>
            <input type="number" className="form-control input-left-space col-sm-6" value={props.values[1]}
                   placeholder={roomTypes.includes(props.names[1]) ? placeholders[1] : placeholders[1] + " coefficient"}
                   name={props.names[1]} onChange={props.onChangeTimeHandler}/>
        </div>
    )
};

export default AdditionalInput;
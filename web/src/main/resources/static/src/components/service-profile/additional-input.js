import React from "react";
import './additional-input.css';

const AdditionalInput = (props) => {

    const placeholders = ['Price coefficient', 'Time'];
    const roomTypes = ['bathroomCleaningTime', 'smallRoomCleaningTime', 'bigRoomCleaningTime'];
    return (
        <div className="col-sm-6 d-flex flex-row">

            <label className="input-group-text" htmlFor={props.names[0] + "Id"}>{placeholders[0]}</label>
            <input type="number" className="form-control col-sm-4" placeholder={placeholders[0]}
                   id={props.names[0] + "Id"} value={props.values[0]} name={props.names[0]}
                   onChange={props.onChangePriceHandler} step={0.25} min={0}/>

            <label className="input-group-text label-left-space" htmlFor={props.names[1] + "Id"}>{roomTypes.includes(props.names[1]) ?
                placeholders[1] : placeholders[1] + " coefficient"}</label>
            <input type="number" className="form-control col-sm-4" value={props.values[1]}
                   placeholder={roomTypes.includes(props.names[1]) ? placeholders[1] : placeholders[1] + " coefficient"}
                   id={props.names[1] + "Id"} name={props.names[1]} onChange={props.onChangeTimeHandler} min={0}/>

        </div>
    )
};

export default AdditionalInput;
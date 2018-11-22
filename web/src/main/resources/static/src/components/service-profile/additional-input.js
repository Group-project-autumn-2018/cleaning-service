import React from "react";
import './additional-input.css';

const AdditionalInput = (props) => {
    const placeholders = ['Price coefficient', 'Time'];
    return (
        <div className="col-sm-4 d-flex flex-row">
            <input type="number" className="form-control col-sm-6" placeholder={placeholders[0]}
                   name={props.names[0]} onChange={props.onChangePriceHandler}/>
            <input type="number" className="form-control input-left-space col-sm-6" placeholder={placeholders[1]}
                   name={props.names[1]} onChange={props.onChangeTimeHandler}/>
        </div>
    )
};

export default AdditionalInput;
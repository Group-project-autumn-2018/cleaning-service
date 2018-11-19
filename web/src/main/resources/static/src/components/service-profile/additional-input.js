import React from "react";
import './additional-input.css';

const AdditionalInput = (props) => {
    const placeholders = ['Price', 'Time'];
    return (
        <div className="col-sm-4 d-flex flex-row">
            <input type="number" className="form-control col-sm-6" placeholder={placeholders[0]}
                   name={props.names[0]} onChange={props.onChangeHandler}/>
            <input type="number" className="form-control input-left-space col-sm-6" placeholder={placeholders[1]}
                   name={props.names[1]} onChange={props.onChangeHandler}/>
        </div>
    )
};

export default AdditionalInput;
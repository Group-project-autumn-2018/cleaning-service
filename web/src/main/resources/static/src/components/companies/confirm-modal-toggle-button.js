import React from 'react';


const ConfirmModalToggleButton = ({onClick}) => {

    return (
        <div>
            <button type="button" data-toggle="modal" data-target="#confirm-modal"
                    className="btn btn-secondary btn btn-success"
                    onClick={onClick}>
                Order
            </button>
        </div>
    )
};


export default ConfirmModalToggleButton;
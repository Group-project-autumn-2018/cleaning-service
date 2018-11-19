import React from 'react';


const ConfirmModalToggleButton = () => {

    return (
        <div>
            <button type="button" data-toggle="modal" data-target="#confirm-modal"
                    className="btn btn-secondary btn btn-success">
                Order
            </button>
        </div>
    )
};


export default ConfirmModalToggleButton;
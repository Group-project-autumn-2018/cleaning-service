import React from "react";

const ModalToggleButton = ({isBanned, onClick}) => {
    return (

        <button type="button" data-toggle="modal" data-target="#ban-modal"
                className={isBanned ? "btn btn-danger" : "btn btn-success"}
                onClick={onClick}>
            {isBanned ? "Unblock" : "Block"}
        </button>
    )
};

export default ModalToggleButton;

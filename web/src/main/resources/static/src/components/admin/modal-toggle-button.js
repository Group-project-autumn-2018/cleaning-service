import React from "react";

const ModalToggleButton = ({isBanned})=>{
    return(

        <button type="button" data-toggle="modal" data-target="#ban-modal"
                className={isBanned ? "btn btn-danger" : "btn btn-success"}>
                {isBanned ? "Разблокировать" : "Заблокировать"}
        </button>
    )
};

export default ModalToggleButton;

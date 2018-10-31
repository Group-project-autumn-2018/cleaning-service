import React from 'react';


const BanToggleButton = ({isBanned, onClick}) => {

    return (
        <div>
            <button className={isBanned ? "btn btn-danger" : "btn btn-success"}
                    onClick={onClick}
                    data-dismiss="modal">
                {isBanned ? "Разблокировать" : "Заблокировать"}</button>
        </div>
    )
};


export default BanToggleButton;
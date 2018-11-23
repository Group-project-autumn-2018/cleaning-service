import React from 'react';

const DropdownAddressList = ({array, onClickHandler}) => {
    const addressList = array.map(address => {
        return <li key={address.place_id} id={address.place_id}
                   className='dropdown-item' onClick={onClickHandler}>{address.display_name}</li>
    });
    const style = {
        display: 'block'
    };

    return (
        <ul className="dropdown-menu" style={addressList.length > 0 ? style : null}>
            {addressList}
        </ul>
    )
};

export default DropdownAddressList;
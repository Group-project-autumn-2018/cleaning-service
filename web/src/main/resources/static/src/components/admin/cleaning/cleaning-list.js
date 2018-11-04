import React from 'react';
import Cleaning from './cleaning';
import BanModal from './ban-modal-cleaning';

const CleaningList = ({cleanings}) => {
    // syntax error cleaning vs cleanings. You map props as cleanings in AdminCleaning mapStateToProps
    const cleaningList = cleanings.map(cleaning =>
        <Cleaning key={cleaning.id} cleaning={cleaning}/>
    );
    console.log(cleanings);
    return (
        <div className="container">
            <table className="table .table-hover">
                <tbody>
                <tr className="row">
                    <th scope="col" className="col">Название</th>
                    <th scope="col" className="col">Email</th>
                    <th scope="col" className="col">Блокировка</th>
                    <th scope="col" className="col">Причина блокировки</th>
                </tr>
                {cleaningList}
                </tbody>
            </table>
            <BanModal/>
        </div>
    )
};

export default CleaningList;
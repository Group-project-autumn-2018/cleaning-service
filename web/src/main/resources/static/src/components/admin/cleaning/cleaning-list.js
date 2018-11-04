import React from 'react';
import Cleaning from './cleaning';
import BanModal from './ban-modal-cleaning';

const CleaningList = ({cleaning}) => {
    const cleaningList = cleaning.map(cleaning =>
        <Cleaning key={cleaning.id} cleaning={cleaning}/>
    );
    console.log(cleaningList);
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
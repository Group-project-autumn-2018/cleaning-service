import React from 'react';
import Cleaning from './cleaning';
import BanModal from './ban-modal-cleaning';

const CleaningList = ({cleanings}) => {
    const cleaningList = cleanings.map(cleaning =>
        <Cleaning key={cleaning.id} cleaning={cleaning}/>
    );
    return (
        <div className="container">
            <table className="table .table-hover">
                <tbody>
                <tr className="row">
                    <th scope="col" className="col">Name</th>
                    <th scope="col" className="col">Email</th>
                    <th scope="col" className="col">Ban</th>
                    <th scope="col" className="col">Ban reason</th>
                </tr>
                {cleaningList}
                </tbody>
            </table>
            <BanModal/>
        </div>
    )
};

export default CleaningList;
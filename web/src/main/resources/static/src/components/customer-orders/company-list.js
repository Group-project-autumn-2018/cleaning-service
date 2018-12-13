import React from 'react';
import Company from './company-model';


const CompaniesList = ({companies}) => {
    const companiesList = companies.map((company) =>
        <Company key={company.id} company={company}/>
    );

    return (
        <div className="container">
            <table className="table table-hover">
                <tbody>
                <tr className="row">
                    <th scope="col" className="col">Logotype</th>
                    <th scope="col" className="col">Company name</th>
                    <th scope="col" className="col">Address</th>
                    <th scope="col" className="col">Ranking</th>
                    <th scope="col" className="col">Order</th>
                </tr>
                {companiesList}
                </tbody>
            </table>
        </div>
    )
};

export default CompaniesList;
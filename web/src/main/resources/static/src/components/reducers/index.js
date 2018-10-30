import {combineReducers} from 'redux';
import * as reducers from '../reducers/admin-reducers';




const rootReducer = combineReducers(
    {
        customers: reducers.customersReducer,
        pagination: reducers.paginationReducer
    }
);

export default rootReducer;
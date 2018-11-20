import {combineReducers} from 'redux';
import * as adminReducers from '../reducers/admin-reducers';
import authReducer from '../reducers/auth-reducers';
import credentialReducer from './credential-reducers';
import customerReducer from './customer-reducer';


const rootReducer = combineReducers(
    {
        user: authReducer,
        entities: adminReducers.entityReducer,
        pagination: adminReducers.paginationReducer,
        entityToUpdate: adminReducers.entityUpdateReducer,
        credentials: credentialReducer,
        customer: customerReducer
    }
);

export default rootReducer;
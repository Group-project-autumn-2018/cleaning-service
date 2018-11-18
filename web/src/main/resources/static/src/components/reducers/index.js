import {combineReducers} from 'redux';
import * as adminReducers from '../reducers/admin-reducers';
import authReducer from '../reducers/auth-reducers';
import customerReducer from './customer-reducer';
import serviceReducer from './service-reducer';

const rootReducer = combineReducers(
    {
        user: authReducer,
        entities: adminReducers.entityReducer,
        pagination: adminReducers.paginationReducer,
        entityToUpdate: adminReducers.entityUpdateReducer,
        customer: customerReducer,
        service: serviceReducer
    }
);

export default rootReducer;
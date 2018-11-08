import {combineReducers} from 'redux';
import * as reducers from '../reducers/admin-reducers';
import * as authReducers from '../reducers/auth-reducers';





const rootReducer = combineReducers(
    {
        user: authReducers.authReducer,
        entities: reducers.entityReducer,
        pagination: reducers.paginationReducer,
        entityToUpdate: reducers.entityUpdateReducer
    }
);

export default rootReducer;
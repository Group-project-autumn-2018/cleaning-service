import {combineReducers} from 'redux';
import * as reducers from '../reducers/admin-reducers';




const rootReducer = combineReducers(
    {
        entities: reducers.entityReducer,
        pagination: reducers.paginationReducer,
        entityToUpdate: reducers.entityUpdateReducer
    }
);

export default rootReducer;
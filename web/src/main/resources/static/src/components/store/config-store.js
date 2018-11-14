import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    stateReconciler: autoMergeLevel2 //for possible future updates, merges the state updating it instead of replacing
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);




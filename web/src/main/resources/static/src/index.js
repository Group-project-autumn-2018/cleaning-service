import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/App";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './components/reducers/index'

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>,
    document.getElementById('App'));


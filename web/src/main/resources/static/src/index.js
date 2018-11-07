import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/App";
import {Provider} from 'react-redux';
import {store} from './components/store/configStore'


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('App'));
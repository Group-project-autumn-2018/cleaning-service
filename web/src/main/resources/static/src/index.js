import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/App";
import {Provider} from 'react-redux';
import { store, persistor } from './components/store/configStore'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('App'));


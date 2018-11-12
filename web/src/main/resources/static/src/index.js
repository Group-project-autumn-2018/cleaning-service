import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/App";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './components/store/config-store';
import {PersistGate} from 'redux-persist/integration/react';


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
                <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('App'));


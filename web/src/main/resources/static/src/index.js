import React from 'react';
import ReactDOM from 'react-dom';
// import AppHeader from './src/components/app-header/index';
import AppHeader from './components/app-header/index';
// import SignIn from './src/components/sign-in/index';
import SignIn from './components/sign-in/index';

ReactDOM.render(<AppHeader isAuthentificated='false'/>, document.getElementById('header'));
ReactDOM.render(<SignIn onSuccessfullLogin={() => console.log("login")}/>, document.getElementById('body'));

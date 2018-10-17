import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './components/app-header';
import SignIn from './components/sign-in';

ReactDOM.render(<AppHeader isAuthentificated='false'/>, document.getElementById('header'));
ReactDOM.render(<SignIn onSuccessfullLogin={() => console.log("login")}/>, document.getElementById('body'));

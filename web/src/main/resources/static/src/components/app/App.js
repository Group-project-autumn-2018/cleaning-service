import React, {Component} from 'react';
import * as actions from '../actions/auth-actions';
import {connect} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import AppHeader from '../app-header/index';
import AppRouting from "../routing";
import './home-wrapper.css';

class App extends Component {

    componentDidMount() {
        this.props.checkAuthStatus();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="home-wrapper">
                    <AppHeader/>
                    <AppRouting isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.role[0] === 'admin'}/>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthStatus: () => dispatch(actions.checkAuthStatus())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
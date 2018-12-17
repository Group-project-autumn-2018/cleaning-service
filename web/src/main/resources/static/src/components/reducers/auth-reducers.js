import {disconnect} from '../actions/notification-actions';

const initialAuthState = {
    isAuthenticated: false,
    name: null,
    email: null,
    role: [],
    token: null,
    refreshToken: null,
    tokenExpirationDate: null,
    error: null
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS':
            return {
                ...action.payload
            };
            break;
        case 'AUTH_FAIL':
            if (action.payload === 'Bad credentials') {
                return {...state, error: 'Invalid login or password'};
            }
            return {...state, error: action.payload};
            break;
        case 'LOGOUT':
            disconnect();
            return {
                ...initialAuthState
            };
        default:
            return state;
    }
};

export default authReducer;
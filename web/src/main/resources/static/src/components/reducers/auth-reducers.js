import {disconnect} from '../actions/notification-actions';

const initialAuthState = {
    isAuthenticated: false,
    address: {
        address: null,
        lat: null,
        lon: null
    },
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
        case 'LOGOUT':
            disconnect();
            return {
                ...initialAuthState
            };
            break;
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
        default:
            return state;
    }
};

export default authReducer;
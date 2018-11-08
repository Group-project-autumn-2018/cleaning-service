const initialPaginationState = {
    isAuthenticated: false,
    name: null,
    email: null,
    role: [],
    token: null,
    refreshToken: null,
    error: null

};

export const authReducer = (state = initialPaginationState, action) =>{
    switch (action.type) {
        case 'AUTH_SUCCESS':
            return {
                ...action.payload
            };
        case 'AUTH_FAIL':
            if (action.payload === 'Bad credentials'){
                return {...state, error: 'Invalid login or password'};
            }
            return {...state, error: action.payload};
        default:
            return state;
    }
};


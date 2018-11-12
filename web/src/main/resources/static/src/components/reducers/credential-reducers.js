const initialCredentialState = {
    username: '',
    base64Token: ''
};

const credentialReducer = (state = initialCredentialState, action) => {
    switch (action.type) {
        case 'SET_CREDENTIALS':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default credentialReducer;
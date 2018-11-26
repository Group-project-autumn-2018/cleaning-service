const initialServiceState = {};

const serviceReducer = (state = initialServiceState, action) => {
    switch (action.type) {
        case 'FETCH_SERVICE_SUCCESS':
            return {
                ...action.payload
            };
        case 'UPDATE_SERVICE_SUCCESS':
            return action.payload;

        default:
            return state;
    }
};

export default serviceReducer;
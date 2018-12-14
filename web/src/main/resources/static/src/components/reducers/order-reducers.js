const initialState = {
    address: {
        address: ""
    }
};


export const updateOrder = (state = initialState, action) => {
    switch (action.type) {
        case 'PREPARE_ORDER_FOR_UPDATE':
            return {
                ...action.payload
            };
        default:
            return state;
    }
};
export const updateOrder = (state = {}, action) => {
    switch (action.type) {
        case 'PREPARE_ORDER_FOR_UPDATE':
            return {
                ...action.payload
            };
        default:
            return state;
    }
};
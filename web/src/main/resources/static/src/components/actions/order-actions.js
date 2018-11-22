export const prepareOrderForUpdate = (order) => {
    return {
        type: 'PREPARE_ORDER_FOR_UPDATE',
        payload: order
    }
};


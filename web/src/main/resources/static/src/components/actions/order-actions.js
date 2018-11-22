export const prepareOrderForUpdate = (entity) => {
    return {
        type: 'PREPARE_ORDER_FOR_UPDATE',
        payload: entity
    }
};


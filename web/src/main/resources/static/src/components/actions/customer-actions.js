import * as api from '../api/api-actions'

const customerURN = '/customer';

export const fetchCustomer = (customerId, token) => {
    return async dispatch => {
        const customer = await api.fetchEntity(customerId, customerURN, token);
        dispatch(fetchCustomerSuccess(customer))
    }
};

export const fetchCustomerSuccess = (customer) => {
    return {
        type: "FETCH_CUSTOMER_SUCCESS",
        payload: customer
    }
};


export const updateCustomer = (entity, token) => {

    return async dispatch => {
        const res = await api.fetchUpdateEntity(entity, customerURN, token);
        console.log('[Entity update status] ' + res.status);
        dispatch(updateCustomerSuccess(entity));
    }
};

export const updateCustomerSuccess = (customer) => {
    return {
        type: 'UPDATE_CUSTOMER_SUCCESS',
        payload: customer
    }
};
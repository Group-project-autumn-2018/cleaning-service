import * as api from '../api/api-actions'

const customerURN = '/customer';

export const fetchCustomer = (customerId, token)=>{
    return async dispatch =>{
        const customer = await api.fetchEntity(customerId, customerURN, token);
        dispatch(fetchCustomerSuccess(customer))
    }
};

export const fetchCustomerSuccess = (customer)=>{
    return{
        type: "FETCH_CUSTOMER_SUCCESS",
        payload: customer
    }
};
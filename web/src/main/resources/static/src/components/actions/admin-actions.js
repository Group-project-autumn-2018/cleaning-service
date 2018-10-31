
export const fetchCustomers = (page, size) =>
{
    return dispatch => {
        fetch(`/customer?page=${page}&size=${size}`).then(resolve => resolve.json()).then(response => {
            const pagination = {
                totalItemsCount: response.totalElements,
                activePage: response.number,
                totalPages: response.totalPages
            };
            dispatch(fetchCustomersSuccess(response.content));
            dispatch(setPagination(pagination));
        });
    }
};


export const updateCustomer = (customer)=> {
    console.log(customer);
    return dispatch => {
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(customer)
        };
        fetch(`/customer/${customer.id}`, options);
        dispatch(updateCustomerSuccess(customer));
        };
    };



export const fetchCustomersSuccess = (customers) => {
    return {
        type: 'FETCH_CUSTOMERS_SUCCESS',
        payload: customers
    };
};

export const setPagination = (pagination) =>{
    return {
        type: 'SET_PAGINATION',
        payload: pagination
    };
};

export const prepareCustomerForUpdate = (customer)=> {
    return {
        type: 'PREPARE_CUSTOMER_FOR_UPDATE',
        payload: customer
    }
};

export const updateCustomerSuccess = (customer)=> {
    return {
        type: 'UPDATE_CUSTOMER_SUCCESS',
        payload: customer
    }
};




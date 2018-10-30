
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

export const fetchCustomersStart = () => {
    return {
        type: 'FETCH_CUSTOMERS_START'
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





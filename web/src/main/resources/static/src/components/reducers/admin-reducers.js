


const initialPaginationState = {
    itemsCountPerPage: 10,
    activePage: 0
};

export const customersReducer = (state = [], action) =>{
    switch (action.type) {
        case 'FETCH_CUSTOMERS_SUCCESS':
            return [
                ...action.payload
            ];
        case 'UPDATE_CUSTOMER_SUCCESS':

            return state.map(customer =>{
                if(customer.id === action.payload.id){
                    return action.payload
                }
                return customer
            });
        default:
            return state;
    }
};

export const paginationReducer = (state = initialPaginationState, action)=>{
    switch (action.type){
        case 'SET_PAGINATION':
            return{
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export const customerUpdateReducer = (state = {}, action) =>{
    switch (action.type){
        case 'PREPARE_CUSTOMER_FOR_UPDATE':
            return{
                ...action.payload
            };
        default:
            return state;
    }
};
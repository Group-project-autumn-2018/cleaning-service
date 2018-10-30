


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
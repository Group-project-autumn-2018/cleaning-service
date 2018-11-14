
const initialCustomerState = {

};

const customerReducer = (state = {}, action) =>{
    switch (action.type){
        case 'FETCH_CUSTOMER_SUCCESS':
            return {
            ...action.payload
        };
        default: return state;
    }
};

export default customerReducer;
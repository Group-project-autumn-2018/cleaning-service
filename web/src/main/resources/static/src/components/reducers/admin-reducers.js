const initialPaginationState = {
    itemsCountPerPage: 10,
    activePage: 0
};

export const entityReducer = (state = [], action) =>{
    switch (action.type) {
        case 'FETCH_ENTITIES_SUCCESS':
            return [
                ...action.payload
            ];
        case 'UPDATE_ENTITY_SUCCESS':

            return state.map(entity =>{
                if(entity.id === action.payload.id){
                    return action.payload
                }
                return entity
            });
        case 'CLEAR_ENTITIES':
            return state;
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

export const entityUpdateReducer = (state = {}, action) =>{
    switch (action.type){
        case 'PREPARE_ENTITY_FOR_UPDATE':
            return{
                ...action.payload
            };
        default:
            return state;
    }
};
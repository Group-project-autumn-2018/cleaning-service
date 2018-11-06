export const fetchEntities = (page, size, entityURN) =>
{
    return dispatch => {
        fetch(`${entityURN}?page=${page}&size=${size}`).then(resolve => resolve.json()).then(response => {
            const pagination = {
                totalItemsCount: response.totalElements,
                activePage: response.number,
                totalPages: response.totalPages
            };
            dispatch(fetchEntitiesSuccess(response.content));
            dispatch(setPagination(pagination));
        });
    }
};


export const updateEntity = (entity, entityURN)=> {
    return dispatch => {
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(entity)
        };
        fetch(`${entityURN}/${entity.id}`, options);
        dispatch(updateEntitySuccess(entity));
        };
    };



export const fetchEntitiesSuccess = (entity) => {
    return {
        type: 'FETCH_ENTITIES_SUCCESS',
        payload: entity
    };
};

export const setPagination = (pagination) =>{
    return {
        type: 'SET_PAGINATION',
        payload: pagination
    };
};

export const prepareEntityForUpdate = (entity)=> {
    return {
        type: 'PREPARE_ENTITY_FOR_UPDATE',
        payload: entity
    }
};

export const updateEntitySuccess = (entity)=> {
    return {
        type: 'UPDATE_ENTITY_SUCCESS',
        payload: entity
    }
};




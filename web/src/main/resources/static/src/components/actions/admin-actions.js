import * as api from '../api/api-actions';

export const fetchEntities = (page, size, entityURN, token) => {
    return dispatch => {
        fetch(`/api${entityURN}?page=${page}&size=${size}&access_token=${token}`).then(resolve => resolve.json()).then(response => {
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


export const updateEntity = (entity, entityURN, token) => {
    return async dispatch => {
        const res = await api.fetchUpdateEntity(entity, entityURN, token);
        console.log('[Entity update status] ' + res.status);
        dispatch(updateEntitySuccess(entity));
    }
};


export const fetchEntitiesSuccess = (entity) => {
    return {
        type: 'FETCH_ENTITIES_SUCCESS',
        payload: entity
    };
};

export const setPagination = (pagination) => {
    return {
        type: 'SET_PAGINATION',
        payload: pagination
    };
};

export const prepareEntityForUpdate = (entity) => {
    return {
        type: 'PREPARE_ENTITY_FOR_UPDATE',
        payload: entity
    }
};

export const updateEntitySuccess = (entity) => {
    return {
        type: 'UPDATE_ENTITY_SUCCESS',
        payload: entity
    }
};




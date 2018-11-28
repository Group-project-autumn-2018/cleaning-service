export const fetchEntities = (page, size, entityURN, token, userID, search) => {

    const userIDParam = userID ? `&userID=${userID}` : '';
    const searchParam = search ? search : '';
    console.log(userID);
    console.log(search);
    console.log(searchParam);
    return dispatch => {
        fetch(`/api${entityURN}?page=${page}&size=${size}&access_token=${token}${userIDParam}${searchParam}`)
            .then(resolve => resolve.json()).then(response => {
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


export const fetchUpdateEntity = async (entity, entityURN, token) => {

    let options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(entity)
    };

    return await fetch(`/api${entityURN}/${entity.id}`, options);
};


export const fetchEntity = async (entityId, entityURN, token) => {
    let options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
    };
    const response = await fetch(`/api${entityURN}/${entityId}`, options);

    return await response.json();
};


export const fetchSaveEntity = async (entity, entityURN, token) => {
    let options = {};

    if (token) {
        options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(entity)
        };
    } else {
        options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(entity)
        };
    }


    return await fetch(`/api${entityURN}`, options);
};

export const updateEntity = (entity, entityURN, token) => {
    return async dispatch => {
        const res = await fetchUpdateEntity(entity, entityURN, token);
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

export const clearEntities = () => {
    return {
        type: 'CLEAR_ENTITIES',
    };
};

export const prepareEntityForUpdate = (entity) => {
    return {
        type: 'PREPARE_ENTITY_FOR_UPDATE',
        payload: entity
    }
};

const updateEntitySuccess = (entity) => {
    return {
        type: 'UPDATE_ENTITY_SUCCESS',
        payload: entity
    }
};
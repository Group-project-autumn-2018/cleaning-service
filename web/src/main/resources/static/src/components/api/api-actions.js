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
        const res = await fetchUpdateEntity(entity, entityURN, token);
        console.log('[Entity update status] ' + res.status);
        dispatch(updateEntitySuccess(entity));
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

export const fetchCompaniesPOST = (entity, entityURN, token) => {

    let options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(entity)

    };
    return dispatch => {
        fetch(`/api${entityURN}`, options).then(resolve => resolve.json()).then(response => {
            console.log(response);
            dispatch(fetchEntitiesSuccess(response));
        })
    }
};


export const fetchUpdateMultipartEntity = async (entity, entityURN, token, id) => {

    let options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        method: 'POST',
        body: entity
    };
    console.log("sending multipart files...");

    return await fetch(`/api${entityURN}/${id}`, options);
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

    let options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(entity)
    };

    return await fetch(`/api${entityURN}`, options);
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
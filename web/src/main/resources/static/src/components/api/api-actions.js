export const fetchEntities = (page, size, entityURN, token, userID, search) => {

    const userIDParam = userID ? `&userID=${userID}` : '';
    const searchParam = search ? search : '';

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

export const fetchCompaniesPOST = (entity, entityURN, token) => {
    let header = {
        'Content-Type': 'application/json'
    };

    if (token) {
        header = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    let options = {
        headers: header,
        method: 'POST',
        body: JSON.stringify(entity)

    };
    return dispatch => {
        fetch(`/api${entityURN}`, options).then(resolve => resolve.json()).then(response => {
            dispatch(fetchEntitiesSuccess(response));
        })
    }
};

export const fetchEntitiesByTypeAndStatus = (page, size, entityURN, token, userID, cleaningType, status, search) => {

    const userIDParam = userID ? `&userID=${userID}` : '';
    const cleaningTypeParam = cleaningType ? `&cleaningType=${cleaningType}` : '';
    const statusParam = status ? `&status=${status}` : '';
    const searchParam = search ? search : '';

    return dispatch => {
        fetch(`/api${entityURN}?page=${page}&size=${size}&access_token=${token}${userIDParam}${cleaningTypeParam}${statusParam}${searchParam}`)
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

export const fetchNumber = async (entityURN, token, userID, cleaningTypes, statuses, frequences) => {

    const userIDParam = userID ? `&userID=${userID}` : "";
    const cleaningTypeParam = cleaningTypes ? `&cleaningTypes=${cleaningTypes}` : [];
    const statusParam = statuses ? `&statuses=${statuses}` : [];
    const frequencyParam = frequences ? `&frequences=${frequences}` : [];


    return await fetch(`/api${entityURN}?access_token=${token}${userIDParam}${cleaningTypeParam}${statusParam}${frequencyParam}`)
        .then(resolve => resolve.json());
};

export const fetchUserInfo = () => {
    const url = "/api/userinfo";
    fetch(url)
        .then((response) => {
            response.json().then((user) => {
                const tokenExpirationDate = Date.now() + (data.expires_in * 1000);
                let payload = {
                    address: {
                        address: data.address,
                        lat: data.lat,
                        lon: data.lon
                    },
                    id: decodedToken.id,
                    isAuthenticated: true,
                    name: data.name,
                    email: decodedToken.user_name,
                    role: decodedToken.authorities,
                    token: data.access_token,
                    tokenExpirationDate: tokenExpirationDate,
                    refreshToken: data.refresh_token
                };
                dispatch(authSuccess(payload));
                dispatch(setAuthTimeout(data.expires_in * 1000))
            });
        })
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

export const fetchCustomerSuccess = (payload) => {
    return {
        type: 'FETCH_CUSTOMER_SUCCESS',
        payload: payload
    };
};

const updateEntitySuccess = (entity) => {
    return {
        type: 'UPDATE_ENTITY_SUCCESS',
        payload: entity
    }
};
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
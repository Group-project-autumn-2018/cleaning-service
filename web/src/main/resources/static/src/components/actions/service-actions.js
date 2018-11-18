import * as api from '../api/api-actions'

const serviceURN = '/cleaning';

export const fetchService = (serviceId, token) => {
    return async dispatch => {
        const service = await api.fetchEntity(serviceId, serviceURN, token);
        dispatch(fetchServiceSuccess(service))
    }
};

export const fetchServiceSuccess = (service) => {
    return {
        type: "FETCH_SERVICE_SUCCESS",
        payload: service
    }
};

export const updateService = (entity, token) => {

    return async dispatch => {
        const res = await api.fetchUpdateEntity(entity, serviceURN, token);
        console.log('[Entity update status] ' + res.status);
        dispatch(updateServiceSuccess(entity));
    }
};

export const updateServiceSuccess = (service) => {
    return {
        type: 'UPDATE_SERVICE_SUCCESS',
        payload: service
    }
};
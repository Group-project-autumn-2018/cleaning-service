const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};


const basicAuth = () => {
    let clientId = "cleaning-app";
    let secret = "secret";
    let clientCredentials = btoa(clientId + ':' + secret);
    return 'Basic ' + clientCredentials;
};


const fetchToken = (body, dispatch) => {
    let options = {
        headers: {
            'Authorization': basicAuth(),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: body
    };
    fetch(`/oauth/token`, options)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(response);
            }
        })
        .then((response) => {
                response.json().then((data) => {
                    let decodedToken = parseJwt(data.access_token);
                    let expirationDate = new Date(new Date() + decodedToken.exp);
                    let payload = {
                        isAuthenticated: true,
                        name: data.name,
                        email: decodedToken.user_name,
                        role: decodedToken.authorities,
                        token: data.access_token,
                        tokenExpirationDate: expirationDate,
                        refreshToken: data.refresh_token
                    };
                    dispatch(authSuccess(payload));
                    dispatch(checkAuthTimeout(data.expires_in))
                });
            }
        ).catch((response) => {
        response.json().then((error) => {
            console.log("[ERROR]" + error.error_description);
            dispatch(authFail(error.error_description));
        });
    });
};

export const fetchAccessToken = (login, password) => {
    return dispatch => {
        let body = `grant_type=password&username=${login}&password=${password}`;
        fetchToken(body, dispatch);
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch, getState) => {

        setTimeout(() => {
                let refreshToken = getState().user.refreshToken;
                if (refreshToken) {
                    dispatch(fetchRefreshToken(refreshToken))
                }
            }, expirationTime
        )

    };
};

export const fetchRefreshToken = (refreshToken) => {
    return dispatch => {
        let body = `grant_type=refresh_token&refresh_token=${refreshToken}`
        fetchToken(body, dispatch);
    };
};

export const authSuccess = (payload) => {
    return {
        type: 'AUTH_SUCCESS',
        payload: payload
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        payload: error
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};


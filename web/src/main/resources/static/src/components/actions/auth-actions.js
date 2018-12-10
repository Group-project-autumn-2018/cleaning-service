const b64DecodeUnicode = str =>
    decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));

const parseJwtToken = token =>
    JSON.parse(
        b64DecodeUnicode(
            token.split('.')[1].replace('-', '+').replace('_', '/')
        )
    );

const parseJwt = (token) => {
    try {
        return parseJwtToken(token);
    } catch (e) {
        console.log(e);
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
        const body = `grant_type=password&username=${login}&password=${password}`;
        fetchToken(body, dispatch);
    };
};

export const setAuthTimeout = (expirationTime) => {
    return (dispatch, getState) => {

        setTimeout(() => {
                const refreshToken = getState().user.refreshToken;
                if (refreshToken) {
                    dispatch(fetchRefreshToken(refreshToken))
                }
            }, expirationTime
        )

    };
};

export const checkAuthStatus = () => {
    return (dispatch, getState) => {
        const tokenExpirationDate = new Date(getState().user.tokenExpirationDate);
        if (!tokenExpirationDate || tokenExpirationDate < new Date()) {
            dispatch(logout())
        } else {
            dispatch(setAuthTimeout(tokenExpirationDate - new Date()));
        }
    }
};

export const fetchRefreshToken = (refreshToken) => {
    return dispatch => {
        const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
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


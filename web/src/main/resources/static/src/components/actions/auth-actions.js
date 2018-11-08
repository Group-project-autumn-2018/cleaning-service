const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};


const fetchAuth = (options, dispatch) => {
    fetch(`/oauth/token`, options)
        .then( (response) =>{
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(response);
            }
        })
        .then( (response)=> {
                response.json().then((data) => {
                    let decodedToken = parseJwt(data.access_token);
                    let payload = {
                        isAuthenticated: true,
                        name: data.name,
                        email: decodedToken.user_name,
                        role: decodedToken.authorities,
                        token: data.access_token,
                        refreshToken: data.refresh_token
                    };
                    dispatch(authSuccess(payload));
                });
            }
        ).catch((response) => {
        response.json().then((error) => {
            console.log("[ERROR]" + error.error_description);
            dispatch(authFail(error.error_description));
        });
    });
};

export const fetchAccessToken = (login, password)=> {
    return dispatch => {
        let clientId = "cleaning-app";
        let secret = "secret";
        let clientCredentials = btoa(clientId + ':' + secret);
        let basicAuth = 'Basic ' + clientCredentials;
        let options = {
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: `grant_type=password&username=${login}&password=${password}`
        };
        fetchAuth(options, dispatch);
    };
};



export const fetchRefreshToken = (login, token)=> {
    return dispatch => {

        let options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: `grant_type=refresh_token&username=${login}&refresh_token=${token}`
        };
        fetchAuth(options, dispatch);
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
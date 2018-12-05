export default class ServiceApi {
    _baseUrl = '/';

    async sendPostRequest(object, tailUrl, token) {
        const url = this._baseUrl + tailUrl;
        const init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: object
        };
        if (token) {
            init.headers = {... init.headers,
                'Authorization': `Bearer ${token}`
            };
        }
        const res = await fetch(url, init);
        return await res;
    }

    async sendPostRequestMultipart(object, tailUrl) {
        const url = this._baseUrl + tailUrl;
        const init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: object
        };
        const res = await fetch(url, init);
        return await res;
    }

    //multipart/form-data
    async preRegisterService(object) {
        const res = await this.sendPostRequest(object, 'api/cleaning/registration');
        return res.status;
    }

    async registerServiceMultipart(object) {
        const res = await this.sendPostRequestMultipart(object, 'api/cleaning/registration/service');
        return res.status;
    }

    async sendFeedback(object, token) {
        const res = await this.sendPostRequest(JSON.stringify(object), 'api/cleaning/feedback', token);
        return res.status;
    }


    async verifyService(object) {
        const res = await this.sendPostRequest(JSON.stringify(object), 'api/cleaning/verify');
        return res.status;
    }
}
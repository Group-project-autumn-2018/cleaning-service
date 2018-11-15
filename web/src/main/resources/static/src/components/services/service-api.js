export default class CustomerApi {
    _baseUrl = '/';

    async sendPostRequest(object, tailUrl, accept) {
        const url = this._baseUrl + tailUrl;
        const init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' + '; charset=utf-8'
            },
            body: object
        };
        const res = await fetch(url, init);
        return await res;
    }

    async preRegisterService(object) {
        const res = await this.sendPostRequest(object, 'api/cleaning/registration', 'multipart/form-data');
        return res.status;
    }

    async verifyService(object) {
        const res = await this.sendPostRequest(JSON.stringify(object), 'api/cleaning/verify', 'application/json');
        return res.status;
    }
}
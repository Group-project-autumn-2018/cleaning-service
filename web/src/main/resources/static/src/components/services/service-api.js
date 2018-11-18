export default class ServiceApi {
    _baseUrl = '/';

    async sendPostRequest(object, tailUrl) {
        const url = this._baseUrl + tailUrl;
        const init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: object
        };
        const res = await fetch(url, init);
        return await res;
    }

    async preRegisterService(object) {
        const res = await this.sendPostRequest(object, 'api/cleaning/registration');
        return res.status;
    }


    async sendFeedback(object) {
        const res = await this.sendPostRequest(JSON.stringify(object), 'api/cleaning/feedback');
        return res.status;
    }


    async verifyService(object) {
        const res = await this.sendPostRequest(JSON.stringify(object), 'api/cleaning/verify');
        return res.status;
    }
}
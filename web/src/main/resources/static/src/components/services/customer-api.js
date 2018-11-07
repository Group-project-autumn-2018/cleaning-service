export default class CustomerApi {
    _baseUrl = '/';

    async sendPostRequest(object, tailUrl) {
        const url = this._baseUrl + tailUrl;
        const init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(object)
        };
        const res = await fetch(url, init);
        return await res;
    }


    async preRegister(object) {
        const res = await this.sendPostRequest(object, 'api/customer/registration');
        return res.status;
    }

    async verify(object) {
        const res = await this.sendPostRequest(object, 'api/customer/verify');
        return res.status;
    }
}
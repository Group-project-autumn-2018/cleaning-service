export default class OpenStreetMapApi {
    async sendGetRequest(url) {
        const init = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        const res = await fetch(url, init);
        return await res;
    }

    async getAddress(query) {
        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`;
        const res = await this.sendGetRequest(url);
        return res.json();
    }
}

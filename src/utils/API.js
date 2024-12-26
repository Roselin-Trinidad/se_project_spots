class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    getAppInfo() {
      return Promise.all([this.getInitialCards()]);
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Error: ${res.status}`);
        });
    }

    // other methods for working with the API
  }

  export default Api;
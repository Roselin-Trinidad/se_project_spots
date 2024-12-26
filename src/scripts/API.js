class Api {
    constructor(options) {
      // constructor body
    }

    getInitialCards() {
      return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
        headers: {
          authorization: "f7be2880-58ac-44a1-9646-7bf8ba324cd8"
        }
      })
        .then(res => res.json())
    }

    // other methods for working with the API
  }

  export default Api;
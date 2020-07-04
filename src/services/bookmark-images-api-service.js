import TokenService from '../services/token-service';
import config from '../config';

const PagesApiService = {
  getPages() {
    return fetch(`${config.API_ENDPOINT}/pages`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  createPage(name, page_order) {
    return fetch(`${config.API_ENDPOINT}/pages`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({name, page_order})
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default PagesApiService

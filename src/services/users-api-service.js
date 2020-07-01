import TokenService from '../services/token-service';
import config from '../config';

const UsersApiService = {
  getUserById() {
    return fetch(`${config.API_ENDPOINT}/users/user`, {
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
  updateUser(update) {
    return fetch(`${config.API_ENDPOINT}/users/user`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(update)
    })
    .then(res => console.log(res)
      // (!res.ok)
      //   ? res.json().then(e => Promise.reject(e))
      //   : res.json()
    )
  },
}

export default UsersApiService;

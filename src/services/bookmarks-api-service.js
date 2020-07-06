import TokenService from '../services/token-service';
import config from '../config';

const BookmarksApiService = {
  getBookmarksByPage(page_id) {
    return fetch(`${config.API_ENDPOINT}/bookmarks/${page_id}`, {
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
  addBookmark(page_id, name, url, base_url, bookmark_order, folder_name, group_name, is_folder, hidden) {
    return fetch(`${config.API_ENDPOINT}/bookmarks`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({page_id, name, url, base_url, bookmark_order, folder_name, group_name, is_folder, hidden})
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  editBookmark(id, page_id, name, url, base_url, bookmark_order, folder_name, group_name, hidden) {
    return fetch(`${config.API_ENDPOINT}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({page_id, name, url, base_url, bookmark_order, folder_name, group_name, hidden})
    })
      .then(res => console.log(res)
        // (!res.ok)
        //   ? res.json().then(e => Promise.reject(e))
        //   : res.json()
      )
  },
  deleteBookmark(id) {
    return fetch(`${config.API_ENDPOINT}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => console.log(res)
        // (!res.ok)
        //   ? res.json().then(e => Promise.reject(e))
        //   : res.json()
      )
  },
}

export default BookmarksApiService

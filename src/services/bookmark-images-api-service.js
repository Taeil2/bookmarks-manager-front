import TokenService from '../services/token-service';
import config from '../config';

const BookmarkImagesApiService = {
  getBookmarkImagesByUrl(base_url) {
    var url = new URL(`${config.API_ENDPOINT}/bookmark-images`);
    var params = {base_url: base_url};
    url.search = new URLSearchParams(params).toString();

    return fetch(url, {
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
  insertBookmarkImages(bookmarkImagesObject) {
    return fetch(`${config.API_ENDPOINT}/bookmark-images`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(bookmarkImagesObject)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default BookmarkImagesApiService

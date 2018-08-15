import axios from 'axios';

class API {
  constructor() {
    this.common = {
      api_key: '9234d11ae25a3141621ee2d10e88edf0',
      base_uri: 'https://api.themoviedb.org/3/',
      images_uri: 'http://image.tmdb.org/t/p/',
    }
  }

  request (url, method = 'GET', extra_params = {}) {
    return axios({
      method,
      url: this.common.base_uri + url,
      params: {
        api_key: this.common.api_key,
        ...extra_params,
      }
    });
  }

  getMostPopular() {
    return this.request('discover/movie', undefined, {sort_by: 'popularity.desc'});
  }

};

export default API;
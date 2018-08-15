import axios from 'axios';
import {
  Observable,
  Subject,
  from,
  of,
  empty,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';

class API {
  constructor() {
    this.common = {
      api_key: '9234d11ae25a3141621ee2d10e88edf0',
      base_uri: 'https://api.themoviedb.org/3/',
      images_uri: 'http://image.tmdb.org/t/p/',
    }

    this.searchTerm = new Subject();
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

  search(term) {
    this.searchTerm.next(term.value);
  }

  doSearch(term) {
    return from(this.request('search/movie', undefined, {query: term}));
  }

  getResults() {
    return this.searchTerm
                .pipe(
                  debounceTime(500),
                  distinctUntilChanged(),
                  switchMap(term => term
                    ? this.doSearch(term) : empty()),
                  map(res => res.data.results),
                  catchError(error => {
                    console.error(error);
                    return empty();
                  }),
                );
  }

};

export default API;
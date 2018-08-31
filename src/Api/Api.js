import axios from 'axios';
import {
  Subject,
  from,
  empty,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  flatMap,
  switchMap,
} from 'rxjs/operators';

class API {
  constructor() {
    this.common = {
      api_key: '9234d11ae25a3141621ee2d10e88edf0',
      base_uri: 'https://api.themoviedb.org/3/',
      images_uri: 'https://image.tmdb.org/t/p/',
    };

    this.searchTerm = new Subject();
    this.movieDetails = new Subject();
  }

  request(url, method = 'GET', extraParams = {}) {
    return axios({
      method,
      url: this.common.base_uri + url,
      params: {
        api_key: this.common.api_key,
        ...extraParams,
      },
    });
  }

  search(term) {
    this.searchTerm.next(term.value);
  }

  selectedMovieId(movieId) {
    this.movieDetails.next(movieId);
  }

  doSearch(term) {
    return from(this.request('search/movie', undefined, { query: term }));
  }

  movieDetailsRequest(movieId) {
    return from(this.request(`movie/${movieId}`));
  }

  getMovieDetails() {
    return this.movieDetails
      .pipe(
        distinctUntilChanged(),
        flatMap(movieId => this.movieDetailsRequest(movieId)),
        map(res => res.data),
        catchError((error) => {
          console.error(error);
          return empty();
        }),
      );
  }

  getResults() {
    return this.searchTerm
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => term
          ? this.doSearch(term)
          : empty()),
        map(res => res.data.results),
        catchError((error) => {
          console.error(error);
          return empty();
        }),
      );
  }
}

export default API;

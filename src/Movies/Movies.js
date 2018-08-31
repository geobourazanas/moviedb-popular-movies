import React from 'react';
import {
  NavLink,
  Link,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import API from '../Api/Api';
import MoviesSearch from './MoviesSearch';
import MoviesDetail from './MoviesDetail';

import './Movies.css';

class Movies extends React.Component {
  constructor() {
    super();

    this.Api = new API();
    this.state = {
      searchResults: [],
    };

    this.Api
      .getResults()
      .subscribe(res => {
        this.setState({
          searchResults: this.sortResults(res),
        });
      });
  }

  handleTyping(e) {
    const term = e.target.value.trim();
    if (term.length >= 3) {
      this.Api.search({ value: term });
    } else {
      this.emptyList();
    }
  }

  emptyList() {
    this.setState({
      searchResults: [],
    });
  }

  clearForm() {
    this.setState({
      searchTerm: '',
    });
    this.emptyList();
  }

  sortResults(arr) {
    return arr.sort((a, b) =>
      (a.vote_count > b.vote_count) ? -1 :
      (
        (b.vote_count > a.vote_count) ? 1 :
      0)
    );
  }

  render() {
    const {
      searchResults,
      searchTerm,
    } = this.state;

    const results = searchResults && searchResults.map(movie => (
      <li className="MoviesSearch__list-group-item" key={movie.id}>
        <NavLink
          to={`/details/${movie.id}`}
        >
          {movie.title}
          <span>
            (votes:
            { movie.vote_count }
            )
          </span>
        </NavLink>
      </li>
    ));

    return (
      <div className="MoviesContainer">
        <h1><Link to="/">Most Popular Movies</Link></h1>
        <MoviesSearch
          onChange={this.handleTyping.bind(this)}
        />
        {this.state.searchResults && <ul className="MoviesSearch__list-group">
          {results}
        </ul>}
      </div>
    );
  }
}

export default Movies;
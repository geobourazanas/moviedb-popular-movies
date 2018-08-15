import React from 'react';
import API from '../Api/Api';
import MoviesSearch from './MoviesSearch';
import './Movies.css';

class Movies extends React.Component {

  constructor() {
    super();

    this.Api = new API();
    this.state = {
      searchResults: [],
    };
  }

  componentWillMount() {
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

  handleClick(movie, e) {
    e.preventDefault();
  }

  emptyList() {
    this.setState({
      searchResults: [],
    });
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
    const results = this.state.searchResults && this.state.searchResults.map(movie => {
      return <li className="MoviesSearch__list-group-item" key={movie.id}>
                <a href="" onClick={(e) => this.handleClick(movie, e)}>{movie.title} <span>(votes: {movie.vote_count})</span></a>
             </li>
    });

    return (
      <div className="MoviesContainer">
        <h1>Most Popular Movies</h1>
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
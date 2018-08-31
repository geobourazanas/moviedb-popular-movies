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
      searchTerm: '',
      redirectDelay: false,
      selectedMovieDetails: {},
    };

    this.handleTyping = this.handleTyping.bind(this);
    this.renderMovieDetails = this.renderMovieDetails.bind(this);
    this.redirectAfterDelay = this.redirectAfterDelay.bind(this);

    this.Api
      .getResults()
      .subscribe(res => this.setState({
        searchResults: this.sortResults(res),
      }));

    this.Api
      .getMovieDetails()
      .subscribe(res => this.setState({
        selectedMovieDetails: res,
      }));
  }

  componentDidMount() {
    this.inputElement.focus();
  }

  componentDidUpdate(prevProps) {
    this.inputElement.focus();
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState({
      redirectDelay: false,
      searchTerm: '',
    });
    this.emptyList();
  }

  handleTyping(e) {
    const term = e.target.value.trim();
    this.setState({ searchTerm: term });
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

  redirectAfterDelay() {
    const { redirectDelay } = this.state;
    setTimeout(() => this.setState({ redirectDelay: true }), 3000);
    return (
      redirectDelay
        ? <Redirect to="/" />
        : <h1>You need to select a movie first!</h1>
    );
  }

  renderMovieDetails(props) {
    const { selectedMovieDetails } = this.state;
    const newProps = {
      ...props,
      selectedMovieDetails,
    };
    this.Api.selectedMovieId(props.match.params.movieId);
    return (
      selectedMovieDetails && <MoviesDetail {...newProps} />
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
          inputRef={el => this.inputElement = el}
          onChange={this.handleTyping}
          value={searchTerm}
        />
        {searchResults && (
          <ul className="MoviesSearch__list-group">
            {results}
          </ul>
        )}

        <Route
          path="/details/:movieId"
          render={this.renderMovieDetails}
        />
        <Route
          exact
          path="/details"
          render={this.redirectAfterDelay}
        />
      </div>
    );
  }
}

// Wrapping Movies component with withRouter
// for having access on "prevProps.location" at "componentDidUpdate"
const MoviesWithRouter = withRouter(Movies);

export default MoviesWithRouter;

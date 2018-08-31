import React from 'react';
import './MoviesSearch.css';

const MoviesSearch = props => (
  <div className="MoviesSearch">
    <input
      ref={props.inputRef}
      placeholder="Start here..."
      onChange={props.onChange}
      value={props.value}
    />
  </div>
);

export default MoviesSearch;

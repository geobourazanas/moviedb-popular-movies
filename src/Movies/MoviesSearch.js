import React from 'react';
import './MoviesSearch.css';

const MoviesSearch = (props) => {

  return (
    <div className="MoviesSearch">
      <input
        placeholder="Start here..."
        onChange={props.onChange}
      />
    </div>
  )
}

export default MoviesSearch;
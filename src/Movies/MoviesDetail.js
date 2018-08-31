import React from 'react';
import API from '../Api/Api';
import './MoviesDetail.css';

const Api = new API();

const MoviesDetail = ({ selectedMovieDetails }) => {
  const {
    adult,
    original_language: language,
    original_title: originalTitle,
    overview,
    poster_path: posterPath,
    release_date: releaseDate,
    title,
    vote_average: votesAverage,
  } = selectedMovieDetails;

  // FIX: Make date localized
  return (
    <div className="MoviesDetail">
      <header className="MoviesDetail__header">
        <h2>{title}</h2>
        <div>
          Release date: <strong>{releaseDate}</strong> -
          <span> Votes average: <strong>{votesAverage}</strong></span>
        </div>
      </header>
      <div className="MoviesDetail__img">
        <img src={`${Api.common.images_uri}w300${posterPath}`} alt={title} />
      </div>
      <div className="MoviesDetail__content">
        <div>
          <strong>Adult: </strong>
          <input
            type="checkbox"
            defaultChecked={adult ? 'checked' : ''}
            disabled
          />
        </div>
        <div>
          <strong>Original language:</strong> {language}
        </div>
        <div>
          <strong>Original title:</strong> {originalTitle}
        </div>
        <div>
          <strong>Overview</strong>
          <br />
          {overview}
        </div>
      </div>
    </div>
  );
};

export default MoviesDetail;

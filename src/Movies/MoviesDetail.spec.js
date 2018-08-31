import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MoviesDetail from './MoviesDetail';

describe('<MoviesDetail />', () => {
  const props = {
    selectedMovieDetails: {
      adult: true,
      language: 'foo',
      originalTitle: 'Original Title',
      overview: 'Overview',
      posterPath: 'posterPath',
      releaseDate: 'releaseDate',
      title: 'title',
      votesAverage: 'votesAverage',
    },
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MoviesDetail {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Movies from './Movies';
import MoviesSearch from './MoviesSearch';

xdescribe('<Movies />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Movies />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders a <MoviesSearch /> component', () => {
    const wrapper = shallow(<Movies />);
    expect(wrapper.find(MoviesSearch).length).toBe(1);
  });

  it('has a header with the text "Most Popular Movies" wrapped by <h1> element', () => {
    const wrapper = shallow(<Movies />);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Most Popular Movies');
  });

  it('has a "MoviesSearch__list-group" class when there no results into this.state.searchResults', () => {
    const wrapper = shallow(<Movies />);
    expect(wrapper.find('.MoviesSearch__list-group').length).toBe(1);
    expect(wrapper.state().searchResults.length).toBe(0);
  });

  it('has children elements when there are results into this.state.searchResults', () => {
    const wrapper = shallow(<Movies />);
    // There is no movies into the results
    expect(wrapper.state().searchResults.length).toBe(0);
    expect(wrapper.find('.MoviesSearch__list-group-item').length).toBe(0);
    
    // Adding two movies into this.state.searchResults
    wrapper.setState({ searchResults: [{id: 'bar'}, {id: 'bar1'}] });
    expect(wrapper.find('.MoviesSearch__list-group-item').length).toBe(2);
  });
});


import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MoviesSearch from './MoviesSearch';

describe('<MoviesSearch />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MoviesSearch />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has an <input /> element with a placeholder="Start here..."', () => {
    const wrapper = shallow(<MoviesSearch />);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('[placeholder="Start here..."]').length).toBe(1);
  });

  // We can also test onChange props.onChange call but we need additional mocking
});

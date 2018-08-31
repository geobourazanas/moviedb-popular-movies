import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import Movies from './Movies/Movies';


xdescribe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders a <Movies /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Movies).length).toBe(1);
  });

});
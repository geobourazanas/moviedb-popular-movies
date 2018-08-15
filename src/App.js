import React from 'react';
import { hot } from 'react-hot-loader';
import 'normalize.css';
import Movies from './Movies/Movies';
import './App.css';

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Movies />
      </div>
    );
  };
};

export default hot(module)(App);
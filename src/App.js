import React from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import Movies from './Movies/Movies';
import 'normalize.css';
import './App.css';

const App = () => (
  <div className="App">
    <Route
      path="/"
      component={Movies}
    />
  </div>
);

export default hot(module)(App);

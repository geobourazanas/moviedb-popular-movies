import React from 'react';
import API from '../Api/Api';

const Api = new API();

class Movies extends React.Component {

  state: {
    foo: '',
  }

  componentWillMount() {
    Api.getMostPopular()
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (<h1> Hello, World!</h1>);
  }
}

export default Movies;
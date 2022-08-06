import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-input">
          Search
          <input type="text" id="search-input" />
        </label>
      </div>
    );
  }
}

export default Search;

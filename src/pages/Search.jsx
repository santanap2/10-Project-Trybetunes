import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state= {
    buttonDisabled: true,
    input: '',
  }

  isButtonDisabled = ({ target }) => {
    this.setState({ input: target.value }, () => {
      const { input } = this.state;
      const buttonMinLength = 2;
      const disabled = input.length < buttonMinLength;
      this.setState({
        buttonDisabled: disabled,
      });
    });
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div
        data-testid="page-search"
        className="search-div"
      >
        <Header />
        <label htmlFor="search-input">
          Pesquise por artistas ou álbuns:
          <input
            type="text"
            id="search-input"
            data-testid="search-artist-input"
            onChange={ this.isButtonDisabled }

          />
        </label>

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;

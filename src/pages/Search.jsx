/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state= {
    buttonDisabled: true,
    input: '',
    loading: false,
    resultAlbums: [],
    resultIsReady: false,
    search: '',
  }

  inputHandler = ({ target }) => {
    this.setState({ input: target.value }, () => {
      const { input } = this.state;
      const buttonMinLength = 2;
      const disabled = input.length < buttonMinLength;
      this.setState({
        buttonDisabled: disabled,
      });
    });
  }

  onClickSearchButton = async () => {
    const { input } = this.state;
    this.setState({
      loading: true,
      search: input,
      resultAlbums: [],
    }, async () => {
      const result = await searchAlbumsAPI(input);
      this.setState({
        loading: false,
        resultAlbums: result,
        resultIsReady: true,
        input: '',
      });
    });
  }

  render() {
    const { buttonDisabled, loading, resultIsReady, resultAlbums, search } = this.state;
    return (
      <div data-testid="page-search" className="search-container">
        <Header />
        <div className="search-div-container">
          { loading ? <Loading /> : (
            <div className="search-div">
              <label htmlFor="search-input" className="label-input">
                <p className="search-text">Pesquise por artistas ou álbuns</p>
                <input
                  type="text"
                  id="search-input"
                  data-testid="search-artist-input"
                  onChange={ this.inputHandler }
                  className="text-input"
                />
              </label>

              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.onClickSearchButton }
                className="button"
              >
                Pesquisar
              </button>
            </div>
          )}
        </div>

        { resultIsReady && (
          <section className="album-results">
            <p className="album-alert">
              { resultAlbums.length === 0 && 'Nenhum álbum foi encontrado'}
              { resultAlbums.length > 0
                && `Resultado de álbuns de: ${search}`}
            </p>
            { resultAlbums.map((item) => {
              const { artistId,
                artistName,
                collectionId,
                collectionName,
                artworkUrl100 } = item;

              return (
                <Link
                  key={ artistId }
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <div
                    className="album-div"
                  >
                    <img
                      src={ artworkUrl100 }
                      alt={ collectionName }
                      className="album-image"
                    />
                    <p className="album-title">
                      { collectionName }
                    </p>
                    <p className="album-artist">{ artistName}</p>
                  </div>
                </Link>
              );
            })}
          </section>
        )}

      </div>
    );
  }
}

export default Search;

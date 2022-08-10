import React, { Component } from 'react';
import Header from '../components/Header';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs,
        loading: false,
      });
    });
  }

  onClickCheckbox = async ({ target }) => {
    this.setState({
      loading: true,
    }, async () => {
      const { favoriteSongs } = this.state;
      const sameId = favoriteSongs.find((item) => Number(target.id) === item.trackId);
      if (target.checked === false) {
        await addSong(sameId);
        target.checked = true;
      }
      if (target.checked) {
        await removeSong(sameId);
        target.checked = false;
      }
      const newFavs = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteSongs: newFavs,
      });
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;

    return (
      <section data-testid="page-favorites">
        <Header />
        <div className="favorites-div">
          <p className="favorites-title">Favoritas</p>
          { loading ? <Loading /> : (
            favoriteSongs.map((item) => {
              const {
                // artistName,
                artworkUrl100,
                collectionName,
                previewUrl,
                trackId,
                trackName,
              } = item;
              return (
                <div key={ trackName } className="tracklist">
                  <div className="track-audio-container">

                    <div className="track-container">
                      {/* { `${trackName} - ${artistName}` } */}
                      { trackName }
                    </div>
                    { (artworkUrl100 && collectionName) && (
                      <img
                        src={ artworkUrl100 }
                        alt={ collectionName }
                        className="favorites-album-cover"
                      />
                    )}
                    <div className="audio-container">
                      <audio
                        data-testid="audio-component"
                        src={ previewUrl }
                        controls
                        className="audio"
                      >
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        {' '}
                        <code>audio</code>
                        .
                      </audio>
                    </div>

                    <div className="favorite-div">
                      { loading ? <Loading /> : (
                        <div className="favorite">
                          <label
                            htmlFor={ trackId }
                          >
                            <input
                              type="checkbox"
                              id={ trackId }
                              data-testid={ `checkbox-music-${trackId}` }
                              onChange={ this.onClickCheckbox }
                              onClick={ this.newFavorites }
                              checked
                              className="checkbox-fav"
                            />
                            Favorita
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    );
  }
}

export default Favorites;

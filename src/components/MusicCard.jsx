import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state= {
    loading: false,
    checked: false,
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = () => {
    this.setState({
      loading: true,
    }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      const { trackId } = this.props;
      const checkedFavorites = favoriteSongs.some((item) => item.trackId === trackId);
      this.setState({
        loading: false,
        checked: checkedFavorites,
      });
    });
  }

  onClickCheckbox = async ({ target }) => {
    this.setState({
      loading: true,
    }, async () => {
      const { musicsArray } = this.props;
      const sameId = musicsArray.find((item) => Number(target.name) === item.trackId);
      const { checked } = this.state;
      if (checked === false) {
        await addSong(sameId);
      }
      if (checked) {
        await removeSong(sameId);
      }
      this.setState({
        loading: false,
        checked: !checked,
      });
    });
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      artworkUrl100,
      // artistName,
      collectionName } = this.props;
    const { loading, checked } = this.state;
    return (
      <div className="tracklist">

        <div className="track-audio-container">

          <div className="track-container">
            {/* { artistName !== false ? `${trackName} - ${artistName}` : trackName } */}
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
                  htmlFor="favorite"
                >
                  <input
                    type="checkbox"
                    id="favorite"
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.onClickCheckbox }
                    onClick={ this.newFavorites }
                    defaultChecked={ checked }
                    name={ trackId }
                  />
                  { checked ? 'Favorita' : '💚' }
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  musicsArray: propTypes.instanceOf(Object).isRequired,
  // artistName: propTypes.string,
  artworkUrl100: propTypes.string,
  collectionName: propTypes.string,
};

MusicCard.defaultProps = {
  // artistName: propTypes.string,
  artworkUrl100: propTypes.string,
  collectionName: propTypes.string,
};

export default MusicCard;

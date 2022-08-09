import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state= {
    loading: false,
    checked: false,
    // favoriteSongs: [],
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
        // favoriteSongs,
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
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div className="tracklist">

        <div className="track-audio-container">

          <div className="track-container">{ trackName }</div>

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
                    onClick={ this.onClickCheckbox }
                    defaultChecked={ checked }
                    name={ trackId }
                  />
                  💚
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
};

export default MusicCard;

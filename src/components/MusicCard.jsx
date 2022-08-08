import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state= {
    loading: false,
    checked: false,
  }

  onClickCheckbox = async () => {
    this.setState({
      loading: true,
    }, async () => {
      await addSong();
      this.setState({
        loading: false,
        checked: true,
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
                    checked={ checked }
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
  trackId: propTypes.string.isRequired,
};

export default MusicCard;

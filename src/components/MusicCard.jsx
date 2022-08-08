import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
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
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumInfo: propTypes.shape({
    trackName: propTypes.string.isRequired,
    previewUrl: propTypes.string.isRequired,
  }).isRequired,
};

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
};

export default MusicCard;

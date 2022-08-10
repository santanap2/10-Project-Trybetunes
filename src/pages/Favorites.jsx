import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
                artworkUrl100,
                artistName,
                trackName,
                trackId,
                previewUrl,
                collectionName } = item;
              return (
                <div key={ trackName } className="tracklist">
                  <MusicCard
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    musicsArray={ favoriteSongs }
                    artworkUrl100={ artworkUrl100 }
                    artistName={ artistName }
                    collectionName={ collectionName }
                  />
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

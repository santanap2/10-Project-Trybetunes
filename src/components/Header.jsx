import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    loading: false,
    username: '',
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser() {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      // console.log(user);
      this.setState({
        username: user.name,
        loading: false,
      });
    });
  }

  render() {
    const { username, loading } = this.state;
    const displayLoading = loading === true;

    return (
      <header data-testid="header-component" className="header">
        <div className="welcome-title">
          <Link to="/" className="title">
            TrybeTunes
          </Link>
          <div>
            <p data-testid="header-user-name" className="welcome">
              { displayLoading ? <Loading /> : (
                <div className="user-div">
                  <p>{username}</p>
                  <img
                    src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                    alt="profile-logo"
                    width="30px"
                  />
                </div>
              )}
            </p>
          </div>
        </div>
        <nav className="nav-header">
          <Link
            data-testid="link-to-search"
            to="/search"
            className="link"
          >
            Pesquisa
          </Link>

          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            className="link"
          >
            Favoritas
          </Link>

          <Link
            data-testid="link-to-profile"
            to="/profile"
            className="link"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;

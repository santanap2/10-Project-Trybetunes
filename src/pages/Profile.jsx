import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    loading: false,
    loggedUser: '',
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        loading: false,
        loggedUser: user,
      });
    });
  }

  render() {
    const { loading, loggedUser } = this.state;
    const { description, email, image, name } = loggedUser;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-div">
          <p className="profile-title">Profile</p>

          { loading ? <Loading /> : (
            <div className="profile-info">

              <div className="photo-and-name">
                <img
                  src={ image || 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png' }
                  alt="profile"
                  data-testid="profile-image"
                  className="profile-img"
                />
                <div className="user-email-container">
                  <p className="username">{name}</p>
                  <p className="email">{ email }</p>
                </div>
              </div>

              <div className="description">
                <p>{ description }</p>
              </div>

              <div className="button-container">
                <Link to="/profile/edit">
                  <button type="button" className="edit-button">
                    Editar perfil
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;

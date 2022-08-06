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
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <div>
          <p data-testid="header-user-name">
            { displayLoading ? (
              <Loading />) : (
              `Seja bem vindo ${username}`
            )}
          </p>
          <Link></Link>
        </div>
      </header>
    );
  }
}

export default Header;

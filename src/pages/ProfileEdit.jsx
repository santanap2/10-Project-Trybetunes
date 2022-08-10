import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    loading: false,
    loggedUser: {
      name: '',
      image: '',
      description: '',
      email: '',
    },
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

  handleChange = ({ target }) => {
    this.setState((prevState) => ({
      loggedUser: {
        ...prevState.loggedUser,
        [target.name]: target.value,
      },
    }));
  }

  updateUserInfo = async () => {
    const { history } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const { loggedUser } = this.state;
      await updateUser(loggedUser);
      history.push('/profile');
    });
  }

  render() {
    const { loading, loggedUser } = this.state;
    const { name, email, description, image } = loggedUser;
    const disabled = name.length < 1
      || email.length < 1
      || description.length < 1
      || image.length < 1;
    return (
      <div data-testid="page-profile-edit" className="profile-edit-container">
        { loggedUser && ''}
        <Header />

        <div className="profile-edit-div">
          <p className="profile-edit-title">Profile Edit</p>
          { loading ? <Loading /> : (
            <div className="form-container">
              <form>
                <label htmlFor="edit-name">
                  Edite o nome
                  <input
                    type="text"
                    data-testid="edit-input-name"
                    id="edit-name"
                    className="text-input"
                    name="name"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>
                <label htmlFor="edit-email">
                  Edite o email
                  <input
                    type="text"
                    data-testid="edit-input-email"
                    id="edit-email"
                    className="text-input"
                    name="email"
                    onChange={ this.handleChange }
                    value={ email }
                  />
                </label>

                <label htmlFor="edit-description">
                  Edite a descrição
                  <textarea
                    data-testid="edit-input-description"
                    id="edit-description"
                    className="text-input textarea"
                    cols="30"
                    rows="4"
                    maxLength={ 100 }
                    name="description"
                    onChange={ this.handleChange }
                    value={ description }
                  />
                </label>

                <label htmlFor="edit-image">
                  Edite a imagem
                  <input
                    type="text"
                    data-testid="edit-input-image"
                    id="edit-image"
                    className="text-input"
                    name="image"
                    onChange={ this.handleChange }
                    value={ image }
                  />
                </label>

                <button
                  type="button"
                  data-testid="edit-button-save"
                  className="save-button"
                  disabled={ disabled }
                  onClick={ this.updateUserInfo }
                >
                  Alterar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};
export default ProfileEdit;

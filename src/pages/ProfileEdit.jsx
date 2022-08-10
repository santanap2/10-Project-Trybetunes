import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    loading: false,
    loggedUser: {
      name: '',
      image: '',
      description: '',
      email: '',
    },
    buttonDisabled: true,
  }

  componentDidMount() {
    this.gettingUser();
    // this.isButtonDisabled();
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
    this.setState({
      loggedUser: {
        [target.name]: target.value,
      },
    });
  }

  // isButtonDisabled = () => {
  //   const { loggedUser } = this.state;
  //   const { name, email, description, image } = loggedUser;
  //   const disabled = (name.length < 1) && (email.length < 1);
  //   console.log(disabled);
  //   //   && (description.length < 1)
  //   //   && (image.length < 1);
  //   // this.setState({
  //   //   buttonDisabled: disabled,
  //   // });
  // }

  render() {
    const { loading, buttonDisabled, loggedUser } = this.state;
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
                  />
                </label>

                <button
                  type="button"
                  data-testid="edit-button-save"
                  className="save-button"
                  disabled={ buttonDisabled }
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

export default ProfileEdit;

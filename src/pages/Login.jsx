import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const buttonMinLength = 3;

class Login extends Component {
  state = {
    buttonDisabled: true,
    username: '',
    logged: false,
  }

  isButtonDisabled = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { username } = this.state;
      const disabled = username.length < buttonMinLength;
      this.setState({
        buttonDisabled: disabled,
      });
    });
  }

  onClickLoginButton = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    await createUser({ name: username });
    this.setState({
      logged: true,
    });
  }

  render() {
    const { buttonDisabled, logged } = this.state;
    const isLogged = logged === true;
    return (
      <div data-testid="page-login">
        {isLogged ? (
          <div>
            <Loading />
            <Redirect to="/search" />
          </div>
        ) : (
          <div>
            <h1>Faça seu Login</h1>
            <form>
              <label htmlFor="login-input">
                Nome de usuário
                <input
                  data-testid="login-name-input"
                  type="text"
                  id="login-input"
                  name="username"
                  onChange={ this.isButtonDisabled }
                />
              </label>

              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.onClickLoginButton }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
// import Loading from '../components/Loading';

class Login extends Component {
  state = {
    buttonDisabled: true,
    username: '',
    loading: false,
  }

  isButtonDisabled = ({ target }) => {
    this.setState({ username: target.value }, () => {
      const { username } = this.state;
      const buttonMinLength = 3;
      const disabled = username.length < buttonMinLength;
      this.setState({
        buttonDisabled: disabled,
      });
    });
  }

  onClickLoginButton = async () => {
    const { history: { push } } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const { username } = this.state;
      await createUser({ name: username });
      push('/search');
    });
  }

  render() {
    const { buttonDisabled, loading } = this.state;
    return (
      <div
        data-testid="page-login"
        className="login-div"
      >
        {
          loading ? (
            <div className="loading-div">
              <div className="loading-big" />
              Carregando...
            </div>
          ) : (
            <div className="login-div">
              <h1 className="login-title">TrybeTunes</h1>
              <form className="login-form">
                <label
                  htmlFor="login-input"
                  className="label-input"
                >
                  Nome de usuário
                  <input
                    data-testid="login-name-input"
                    type="text"
                    id="login-input"
                    name="username"
                    className="text-input"
                    onChange={ this.isButtonDisabled }
                  />
                </label>

                <button
                  data-testid="login-submit-button"
                  type="button"
                  className="login-button"
                  disabled={ buttonDisabled }
                  onClick={ this.onClickLoginButton }
                >
                  Entrar
                </button>
              </form>
            </div>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({ push: '' }).isRequired,
};

export default Login;

import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { message } from 'antd';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import logo from '../../images/logo.png';

class RegisterPanel extends React.Component {
  state = {
    login: '',
    password: '',
    email: '',
    repPassword: '',
    invalidData: false,
  };

  static contextType = Store;

  postUser = async () => {
    await axios({
      method: 'post',
      url: '/api/users',
      headers: setHeaders(),
      data: {
        username: this.state.login,
        email: this.state.email,
        password: this.state.password,
      },
    }).then(
      (res) => {
        console.log(res.data);
        if (res.status === 200) {
          message.success('Account has been created!', 3).then((document.location.href = '/login'));
        }
      },
      (err) => {
        message.error(err.response.data);
      },
    );
  };

  nameValidate = () => {
    if (this.state.login.length < 6 || this.state.login.length > 16) {
      message.error('Login must be 6-16 letters long.', 3);
      this.setState({ invalidData: true });
    }
  };

  passwordValidate = () => {
    if (this.state.password.length < 8) {
      message.error('Password must be at least 8 characters long.', 3);
      this.setState({ invalidData: true });
    }
    if (this.state.repPassword !== this.state.password) {
      message.error('Both passwords must be the same.', 3);
      this.setState({ invalidData: true });
    }
  };

  onButtonSubmit = async (e) => {
    this.setState({ invalidData: false });
    e.preventDefault();
    await this.nameValidate();
    await this.passwordValidate();
    if (this.state.invalidData === false) {
      await this.postUser();
    }
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div className="register-logo">
          <img src={logo} alt=""></img> Linguitica
        </div>

        <div className="register">
          <form className="register-container" onSubmit={this.onButtonSubmit}>
            <p>
              <input
                type="text"
                name="login"
                placeholder="LOGIN"
                onChange={this.handleChange}
                value={this.state.login}
              />
            </p>
            <p>
              <input
                type="email"
                name="email"
                placeholder="E-MAIL"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </p>
            <p>
              <input
                type="password"
                name="password"
                placeholder="HASŁO"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </p>
            <p>
              <input
                type="password"
                name="repPassword"
                placeholder="POWTÓRZ HASŁO"
                onChange={this.handleChange}
                value={this.state.repPassword}
              />
            </p>
            <p>
              <input type="submit" value="DOŁĄCZ" />
            </p>
          </form>
          <div>
            jeśli masz już konto -<NavLink to="/login">zaloguj się</NavLink>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterPanel;

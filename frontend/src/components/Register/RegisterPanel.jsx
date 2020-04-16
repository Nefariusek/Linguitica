import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import logo from '../../images/logo.png';

class RegisterPanel extends React.Component {
  state = {
    login: '',
    password: '',
    email: '',
    repPassword: '',
  };

  static contextType = Store;

  postUser = async () => {
    try {
      if (this.state.repPassword !== this.state.password) {
        throw new Error('Both passwords must be the same');
      }
      const res = await axios({
        method: 'post',
        url: '/api/users',
        headers: setHeaders(),
        data: {
          username: this.state.login,
          email: this.state.email,
          password: this.state.password,
        },
      });
      if (res.status === 200) {
        document.location.href = '/login';
      } else {
        this.setState({ invalidData: true });
      }
    } catch (err) {
      console.error('Error Registration:', err);
      this.setState({ invalidData: true });
    }
  };

  //checking input data
  onButtonSubmit = async (e) => {
    e.preventDefault();
    this.postUser();
  };

  //handle for inputs
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

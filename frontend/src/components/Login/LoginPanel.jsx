import React from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';
import logo from '../../images/logo.png';

class LoginPanel extends React.Component {
  state = {
    email: '',
    password: '',
    invalid: false,
  };

  static contextType = Store;

  authUser = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/api/auth',
        headers: setHeaders(),
        data: {
          email: this.state.email,
          password: this.state.password,
        },
      });
      console.log(res);
      if (res.status === 200) {
        const token = res.headers['x-auth-token'];
        localStorage.setItem('token', token);
        localStorage.setItem('id', jwt(token)._id);
        this.context.changeStore('isLogged', true);
        document.location.href = '/home';
      }
    } catch (err) {
      console.error('Error Login:', err);
      this.setState({ invalidData: true });
    }
  };

  onButtonSubmit = async (e) => {
    e.preventDefault();
    this.authUser();
  };

  //handle for inputs
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  loginValidate = () => {
    if (this.state.invalid) {
      return alert('Invalid email or password');
    } else {
      return null;
    }
  };

  //return if logging was succesful
  render() {
    if (this.context.isLogged) return <Redirect to="/home" />;

    return (
      <div className="login-body">
        <div className="login-logo">
          <img src={logo} alt=""></img> Linguitica
        </div>

        <div className="login">
          <form className="login-container" onSubmit={this.onButtonSubmit}>
            <p>
              <input
                type="email"
                name="email"
                placeholder="LOGIN LUB EMAIL"
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
                error={this.loginValidate()}
              />
            </p>
            <p>
              <input type="submit" value="ZALOGUJ" />
            </p>
          </form>
          <NavLink to="/passwordreset">Nie pamiętam hasła</NavLink>
          <div></div>
          <NavLink to="/register">Zarejestruj się</NavLink>
        </div>
      </div>
    );
  }
}

export default LoginPanel;

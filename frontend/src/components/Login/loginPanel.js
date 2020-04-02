import React from 'react';
import './login.css';
import logo from './logo.png';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class LoginPanel extends React.Component {
  state = {
    email: '',
    password: '',
    isLogged: false,
    invalid: false,
  };

  //there will be checkingch
  onButtonSubmit = e => {
    //if (this.state.email === 'a@pl' && this.state.password === 'haslo') {
    this.setState({ isLogged: true });
    //} else this.setState({ invalid: true });
  };

  //handle for inputs
  handleChange = e => {
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
    if (this.state.isLogged) return <Redirect to="/homepage" />;

    return (
      <div>
        <div className="logo">
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
          <NavLink to="/login/passwordreset">Nie pamiętam hasła</NavLink>
          <div></div>
          <NavLink to="/register">Zarejestruj się</NavLink>
        </div>
      </div>
    );
  }
}

export default LoginPanel;

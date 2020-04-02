import React from 'react';
import './register.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';

class RegisterPanel extends React.Component {
  state = {
    login: '',
    password: '',
    email: '',
    repPassword: '',
  };

  //checking input data
  onButtonSubmit = e => {};

  //handle for inputs
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div className="logo">
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
          <div className="test">
            jeśli masz już konto -<Link to="/">zaloguj się</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterPanel;

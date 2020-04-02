import React from 'react';
import './body.css';
import check from '../../pictures/check.png';
import roslinka from '../../pictures/roslinka.png';
import wybor from '../../pictures/wybor.png';
import statystyki from '../../pictures/statystyki.jpg';
import fiszka from '../../pictures/fiszka.png';
import { Redirect } from 'react-router-dom';

class Body extends React.Component {
  state = {
    isLogged: false,
  };

  onButtonSubmit = event => {
    this.setState({ isLogged: true });
  };
  render() {
    if (this.state.isLogged) return <Redirect to="/register" />;
    return (
      <div className="bodyBox">
        <div className="part">
          <div className="slogan">
            <img src={check} alt=""></img>
            <h2>Stwórz swojego bohatera</h2>
          </div>

          <div className="picRoslinka">
            <img src={roslinka} alt="roslinka" />
          </div>
        </div>

        <div className="part">
          <div className="slogan">
            <img src={check} alt=""></img>
            <h2>Każda roślina to inny tryb nauki</h2>
          </div>

          <div className="pic">
            <img src={wybor} alt=""></img>
          </div>
        </div>

        <div className="part">
          <div className="slogan">
            <img src={check} alt=""></img>
            <h2>Twórz własne zestawy fiszek</h2>
          </div>

          <div className="pic">
            <img src={fiszka}></img>
          </div>
        </div>

        <div className="part">
          <div className="slogan">
            <img src={check} alt=""></img>
            <h2>Zbieraj cenne punkty i patrz jak Twoja wiedza rozkwita</h2>
          </div>

          <div className="pic">
            <img src={statystyki}></img>
          </div>
        </div>

        <form onSubmit={this.onButtonSubmit}>
          <div></div>
          <input type="submit" value="DOŁĄCZ DO NAS" />
        </form>
      </div>
    );
  }
}

export default Body;

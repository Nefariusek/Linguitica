import React from 'react';
import './startBody.css';
import check from '../../images/check.png';
import flower from '../../images/flower.png';
import choiceForm from '../../images/choiceForm.png';
import statistics from '../../images/statistics.jpg';
import fiszka from '../../images/fiszka.png';
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
            <img src={flower} alt="roslinka" />
          </div>
        </div>

        <div className="part">
          <div className="slogan">
            <img src={check} alt=""></img>
            <h2>Każda roślina to inny tryb nauki</h2>
          </div>

          <div className="pic">
            <img src={choiceForm} alt=""></img>
          </div>
        </div>

        <div className="part">
          <div className="slogan">
            <img src={check} alt=""></img>
            <h2>Twórz własne zestawy fiszek</h2>
          </div>

          <div className="pic">
            <img src={fiszka} alt={'obrazek'}></img>
          </div>
        </div>

        <div className="part">
          <div className="slogan">
            <img src={check} alt=""></img>
            <h2>Zbieraj cenne punkty i patrz jak Twoja wiedza rozkwita</h2>
          </div>

          <div className="pic">
            <img src={statistics} alt={'obrazek'}></img>
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

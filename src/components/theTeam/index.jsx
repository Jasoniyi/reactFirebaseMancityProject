import React, { Component } from "react";
import PlayerCard from "../ui/PlayerCard";
import Fade from "react-reveal/Fade";

import Stripes from "../../Resources/images/stripes.png";
import { firebasePlayers, firebase } from "../../firebase";
import { firebaseLooper } from "../ui/misc";
import { Promise } from "core-js";

class TheTeam extends Component {
  state = {
    loading: true,
    players: []
  };

  // fetch list of players
  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);
      let promises = [];

      //   console.log(players);
      // loop thru all d players
      for (let key in players) {
        //create a new promise and push inside promises
        promises.push(
          // here 4 each player we create a new Promise
          // make a request to d server
          // bring d download url for each players
          // we push d promise with rej and res to the promises array
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("players")
              .child(players[key].image)
              .getDownloadURL()
              // firebase promise get resolved here
              .then(url => {
                players[key].url = url;
                resolve();
              });
          })
        );
      }
      // update state till all 20 promises are resolved
      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players
        });
      });
    });
  }

  showplayersByCategory = category =>
    // to make sure we have a list of players
    this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === category ? (
            <Fade left delay={i * 20} key={i}>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    console.log(this.state.players);
    return (
      <div
        className="the_team_container"
        style={{
          background: `url(${Stripes}) repeat`
        }}
      >
        {/* to show only if loading is false */}
        {!this.state.loading ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showplayersByCategory("Keeper")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showplayersByCategory("Defence")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showplayersByCategory("Midfield")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">
                {this.showplayersByCategory("Striker")}
              </div>
            </div>
          </div>
        ) : (
          <div className="team_not_found_container">
            <h4>Please login to view team</h4>
          </div>
        )}
      </div>
    );
  }
}

export default TheTeam;

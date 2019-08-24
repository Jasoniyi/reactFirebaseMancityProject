import React, { Component } from "react";
import Animate from "react-move/Animate";
import { easePolyOut } from "d3-ease";
import Sterling from "../../../Resources/images/players/Raheem.png";
import PlayerCard from "../../ui/PlayerCard";

class HomeCards extends Component {
  state = {
    cards: [
      {
        left: 300,
        bottom: 90
      },
      {
        left: 200,
        bottom: 60
      },
      {
        left: 100,
        bottom: 30
      },
      {
        left: 0,
        bottom: 0
      }
    ]
  };

  showAnimatedCards = () =>
    this.state.cards.map((card, i) => (
      <Animate
        key={i}
        show={this.props.show}
        start={{
          left: 0,
          bottom: 0
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 500, ease: easePolyOut }
        }}
      >
        {({ left, bottom }) => {
          return (
            <div
              style={{
                position: "absolute",
                left,
                bottom
              }}
            >
              <PlayerCard
                number="7"
                name="Sterling"
                lastname="Raheem"
                bck={Sterling}
              />
            </div>
          );
        }}
      </Animate>
    ));

  render() {
    return <div>{this.showAnimatedCards()}</div>;
  }
}

export default HomeCards;

import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

import { firebase } from "../../../firebase";

const AdminNav = () => {
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches"
    },
    {
      title: "Add Matches",
      linkTo: "/admin_matches/edit_match"
    },
    {
      title: "Players",
      linkTo: "/admin_players"
    },
    {
      title: "Add players",
      linkTo: "/admin_players/add_players"
    }
  ];

  const style = {
    color: "#ffffff",
    fontWeight: "300",
    borderBottom: "1px solid #353535"
  };

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("signed out");
        },
        error => {
          console.log("went wrong");
        }
      );
  };

  const renderItems = () =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));
  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={() => logoutHandler()}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../Hoc/adminLayout";

import { firebasePlayers } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../ui/misc";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: []
  };

  componentDidMount() {
    // fetch list of players
    firebasePlayers.once("value").then(snapshot => {
      const player = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        players: reverseArray(player)
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Lastname</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.players
                  ? this.state.players.map((player, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Link to={`admin_players/add_players/${player.id}`}>
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`admin_players/add_players/${player.id}`}>
                            {player.lastname}
                          </Link>
                        </TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>

          <div className="admin_progress">
            {/* adds loading bar */}
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
            ) : null}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;

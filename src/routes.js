import React from "react";
import Layout from "./Hoc/Layout";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/authRoutes/PrivateRoute";
import PublicRoute from "./components/authRoutes/PublicRoute";

// public routes
import Home from "./components/home";
import SignIn from "./components/sign_in";
import TheTeam from "./components/theTeam";
import TheMatches from "./components/theMatches";
import NotFound from "./components/ui/not_found";

// all admin routes (which are private)
import Dashboard from "./components/admin/Dashboard";
import AdminMatches from "./components/admin/matches";
import AddEditMatch from "./components/admin/matches/AddEditMatch";
import AdminPlayers from "./components/admin/players";
import AddEditPlayers from "./components/admin/players/AddEditPlayers";

//uses props(user) from index and passed to private & public routes
const Routes = props => {
  return (
    <Layout>
      <Switch>
        {/* private  route for only loged in users*/}
        <PrivateRoute
          {...props}
          path="/admin_players/add_players"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoute
          {...props}
          path="/admin_players/add_players/:id"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoute
          {...props}
          path="/admin_players"
          exact
          component={AdminPlayers}
        />
        <PrivateRoute
          {...props}
          path="/admin_matches/edit_match"
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PrivateRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />

        {/* for every body */}
        <PublicRoute
          {...props}
          restricted={true}
          path="/sign_in"
          exact
          component={SignIn}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/the_team"
          exact
          component={TheTeam}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/the_matches"
          exact
          component={TheMatches}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />
        {/* always put the 404 not found as the last route */}
        <PublicRoute {...props} restricted={false} exact component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;

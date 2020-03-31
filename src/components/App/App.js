import React from "react";
import { Order } from "../Order/Order";
import { withUser } from "../../contexts/UserContext";
import Link from "@material-ui/core/Link";

class AppComponent extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        {user.isAdmin && <Link to="/admin">Админка</Link>}
        <p>Привет, {user.name}!</p>
        <Order />
      </div>
    );
  }
}

export const App = withUser(AppComponent);

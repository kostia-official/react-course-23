import React from "react";

export const UserContext = React.createContext();

export class UserProvider extends React.Component {
  state = {
    user: {
      name: "Джон",
      birthdayYear: 2003
    }
  };

  isAdult = () => {
    return new Date().getFullYear() - this.state.user.birthdayYear >= 18;
  };

  render() {
    return (
      <UserContext.Provider
        value={{ user: this.state.user, isAdult: this.isAdult }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

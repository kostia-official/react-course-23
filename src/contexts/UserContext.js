import React from "react";

export const UserContext = React.createContext();

export class UserProvider extends React.Component {
  state = {
    user: {
      name: "Джо",
      birthdayYear: 2002,
      phoneNumber: "96112233",
      isAdmin: false
    }
  };

  isAdult = () => {
    const currentYear = new Date().getFullYear();

    return currentYear - this.state.user.birthdayYear >= 18;
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

export const withUser = WrappedComponent => props => {
  return (
    <UserContext.Consumer>
      {({ user, isAdult }) => (
        <WrappedComponent {...props} user={user} isAdult={isAdult} />
      )}
    </UserContext.Consumer>
  );
};

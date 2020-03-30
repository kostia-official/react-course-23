import React from "react";
import { UserContext } from "../contexts/UserContext";

export const withUser = WrappedComponent => {
  return class UseUser extends React.Component {
    render() {
      return (
        <UserContext.Consumer>
          {consumerData => (
            <WrappedComponent {...this.props} {...consumerData} />
          )}
        </UserContext.Consumer>
      );
    }
  };
};

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRouteClass extends React.Component {
  render() {
    const { isAuthenticated, ...props } = this.props;

    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: '/auth',
            state: { goBackTo: props.path }
          }}
        />
      );
    }

    return <Route {...props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
});

export const PrivateRoute = connect(mapStateToProps)(PrivateRouteClass);

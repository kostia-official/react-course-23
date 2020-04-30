import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../reducers/user';
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

const mapStateToProps = (state) => ({ isAuthenticated: isAuthenticated(state) });

export const PrivateRoute = connect(mapStateToProps)(PrivateRouteClass);

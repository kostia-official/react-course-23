import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { signOut } from '../../actions/user';

class UserPanelClass extends React.Component {
  onSignInClick = () => {
    this.props.history.push('/auth');
  };

  render() {
    const { signOut, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <Button size="small" onClick={() => signOut()}>
          Sign Out
        </Button>
      );
    }

    return (
      <div>
        <Button size="large" onClick={this.onSignInClick}>
          Sign In
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
});
const actionCreators = {
  signOut
};

export const UserPanel = compose(
  connect(mapStateToProps, actionCreators),
  withRouter
)(UserPanelClass);

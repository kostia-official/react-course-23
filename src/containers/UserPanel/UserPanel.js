import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { signOut } from '../../actions/user';
import { withRouter } from 'react-router-dom';

class UserPanelClass extends React.Component {
  state = {
    isShowAuthModal: false
  };

  openAuth = () => {
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
        <Button size="small" onClick={this.openAuth}>
          Sign In
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isAuthenticated: state.user.isAuthenticated });
const actionCreators = {
  signOut
};

export const UserPanel = connect(mapStateToProps, actionCreators)(withRouter(UserPanelClass));

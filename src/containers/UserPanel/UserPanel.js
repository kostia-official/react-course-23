import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CardModal } from '../../components/CardModal/CardModal';
import { AuthModalContent } from '../../components/AuthModalContent/AuthModalContent';
import { signUp, signIn, signOut } from '../../actions/user';

class UserPanelClass extends React.Component {
  state = {
    isShowAuthModal: false
  };

  onModalToggle = () => {
    this.setState((state) => ({
      isShowAuthModal: !state.isShowAuthModal
    }));
  };

  render() {
    const { signUp, signIn, signOut, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <Button size="small" onClick={() => signOut()}>
          Sign Out
        </Button>
      );
    }

    return (
      <div>
        <CardModal isShow={this.state.isShowAuthModal} onClose={this.onModalToggle}>
          <AuthModalContent onSignUp={signUp} onSignIn={signIn} />
        </CardModal>
        <Button size="small" onClick={this.onModalToggle}>
          Sign In
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isAuthenticated: state.user.isAuthenticated });
const actionCreators = {
  signUp,
  signIn,
  signOut
};

export const UserPanel = connect(mapStateToProps, actionCreators)(UserPanelClass);

import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { CardModal } from '../../components/CardModal/CardModal';
import { signUp, signIn, signOut } from '../../actions/user';
import { AuthModalContent } from '../../components/AuthModalContent/AuthModalContent';

class UserPanel extends React.Component {
  state = {
    isShowAuthModal: false
  };

  toggleAuthModal = () => {
    this.setState((state) => ({ isShowAuthModal: !state.isShowAuthModal }));
  };

  onSignIn = (data) => {
    this.props.signIn(data);
    this.toggleAuthModal();
  };

  onSignUp = (data) => {
    this.props.signUp(data);
    this.toggleAuthModal();
  };

  render() {
    const { isLoggedIn, signOut } = this.props;
    const { isShowAuthModal } = this.state;

    if (isLoggedIn) {
      return (
        <Fragment>
          <Button size="small" onClick={() => signOut()}>
            Logout
          </Button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <CardModal isShow={isShowAuthModal} onClose={this.toggleAuthModal}>
          <AuthModalContent onSignIn={this.onSignIn} onSignUp={this.onSignUp} />
        </CardModal>

        <div>
          <Button size="small" onClick={this.toggleAuthModal}>
            Sign In
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  errorMessage: state.user.errorMessage
});

const actionCreators = {
  signUp,
  signIn,
  signOut
};

export default connect(mapStateToProps, actionCreators)(UserPanel);

import React from 'react';
import styled from 'styled-components';
import { AuthContent } from '../../components/AuthContent/AuthContent';
import { signUp, signIn } from '../../actions/user';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class AuthClass extends React.Component {
  render() {
    const { signUp, signIn, isAuthenticated, location } = this.props;

    if (isAuthenticated) {
      const goBackTo = location.state?.goBackTo;
      const redirectTo = goBackTo || '/';

      return <Redirect to={redirectTo} />;
    }

    return (
      <Wrapper>
        <AuthContent onSignUp={signUp} onSignIn={signIn} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({ isAuthenticated: state.user.isAuthenticated });
const actionCreators = {
  signUp,
  signIn
};

export const Auth = connect(mapStateToProps, actionCreators)(AuthClass);

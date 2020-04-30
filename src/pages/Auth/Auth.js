import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AuthContent } from '../../containers/AuthContent/AuthContent';
import { isAuthenticated } from '../../reducers/user';
import { Redirect } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

class AuthClass extends React.Component {
  render() {
    const { isAuthenticated, location } = this.props;
    const redirectTo = location.state?.goBackTo || '/';

    if (isAuthenticated) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <Container>
        <AuthContent />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ isAuthenticated: isAuthenticated(state) });

export const Auth = connect(mapStateToProps)(AuthClass);

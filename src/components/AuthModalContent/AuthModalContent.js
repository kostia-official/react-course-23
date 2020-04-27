import React, { Fragment } from 'react';
import { CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';

const CardContentWrapper = styled(CardContent)`
  display: flex;
  flex-direction: column;
  margin: 0 50px;
  width: 250px;
`;

const TextFieldStyled = styled(TextField)`
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-align: center;
  margin-top: 4px;
`;

export class AuthModalContent extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    isSignIn: true
  };

  onChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  toggleSignMode = () => this.setState((state) => ({ isSignIn: !state.isSignIn }));

  render() {
    const { onSignUp, onSignIn } = this.props;
    const { email, name, password, isSignIn } = this.state;

    return (
      <CardContentWrapper>
        <TextFieldStyled
          placeholder="Email"
          type="email"
          name="name"
          value={email}
          onChange={this.onChange('email')}
        />
        <Fragment>
          {!isSignIn && (
            <TextFieldStyled placeholder="Name" value={name} onChange={this.onChange('name')} />
          )}
        </Fragment>
        <TextFieldStyled
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={this.onChange('password')}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            isSignIn ? onSignIn({ email, password }) : onSignUp({ email, name, password })
          }
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>
        <StyledLink href="#" onClick={this.toggleSignMode} variant="body2">
          {isSignIn ? 'Not signed in? Sign Up' : 'Already signed up? Sign In'}
        </StyledLink>
      </CardContentWrapper>
    );
  }
}

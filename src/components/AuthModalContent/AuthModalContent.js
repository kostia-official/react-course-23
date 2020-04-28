import React from 'react';
import styled from 'styled-components';
import { CardContent, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const CardContentStyled = styled(CardContent)`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 50px;
  width: 250px;
`;

const TextFieldStyled = styled(TextField)`
  margin: 4px;
`;

const LinkStyled = styled(Link)`
  margin: 6px 0;
`;

export class AuthModalContent extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    isSignUpMode: false
  };

  onAuthModeToggle = () => {
    this.setState((state) => ({
      isSignUpMode: !state.isSignUpMode
    }));
  };

  onTextChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  onSubmit = () => {
    const { email, name, password, isSignUpMode } = this.state;

    if (isSignUpMode) {
      this.props.onSignUp({ email, name, password });
    } else {
      this.props.onSignIn({ email, password });
    }
  };

  render() {
    const { isSignUpMode } = this.state;

    return (
      <CardContentStyled>
        <TextFieldStyled
          type="email"
          name="name"
          onChange={this.onTextChange('email')}
          placeholder="Email"
        />
        {isSignUpMode && (
          <TextFieldStyled type="text" onChange={this.onTextChange('name')} placeholder="Name" />
        )}
        <TextFieldStyled
          type="password"
          name="password"
          onChange={this.onTextChange('password')}
          placeholder="Password"
        />
        <Button
          variant="contained"
          color="primary"
          onChange={this.onTextChange('email')}
          onClick={this.onSubmit}
        >
          {isSignUpMode ? 'Sign Up' : 'Sign In'}
        </Button>
        <LinkStyled to="#" onClick={this.onAuthModeToggle} variant="body2">
          {isSignUpMode ? 'Already signed up? Login' : `Don't have account? Sign Up`}
        </LinkStyled>
      </CardContentStyled>
    );
  }
}

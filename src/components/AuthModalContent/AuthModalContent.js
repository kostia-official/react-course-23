import React, { Fragment } from 'react';
import { CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const CardContentWrapper = styled(CardContent)`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 50px;
  width: 250px;
`;

const TextFieldStyled = styled(TextField)`
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-align: center;
  margin: 6px 0;
`;

export class AuthModalContent extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    password2: '',
    isSignIn: true,
    errorMessage: this.props.errorMessage
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.setState({ errorMessage: this.props.errorMessage });
    }
  }

  onChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  toggleSignMode = () => this.setState((state) => ({ isSignIn: !state.isSignIn }));

  onDoneClick = () => {
    const { onSignUp, onSignIn } = this.props;
    const { email, name, password, password2, isSignIn } = this.state;

    if (isSignIn) {
      return onSignIn({ email, password });
    }

    if (password !== password2) {
      return this.setState({ errorMessage: 'Passwords should be the same!' });
    }

    onSignUp({ email, name, password, password2 });
  };

  render() {
    const { email, name, password, password2, isSignIn, errorMessage } = this.state;

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
        <Fragment>
          {!isSignIn && (
            <TextFieldStyled
              placeholder="Password again"
              name="password2"
              type="password"
              value={password2}
              onChange={this.onChange('password2')}
            />
          )}
        </Fragment>
        <Button variant="contained" color="primary" onClick={this.onDoneClick}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>
        <StyledLink href="#" onClick={this.toggleSignMode} variant="body2">
          {isSignIn ? 'Not signed in? Sign Up' : 'Already signed up? Sign In'}
        </StyledLink>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </CardContentWrapper>
    );
  }
}

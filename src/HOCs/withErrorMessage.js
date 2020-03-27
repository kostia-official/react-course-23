import React from 'react';
import _ from 'lodash';
import { UnauthorizedErrorMessage } from '../components/UnauthorizedErrorMessage/UnauthorizedErrorMessage';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export const withErrorMessage = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      errorMessage: ''
    };

    setErrorMessage = (err) => {
      const isUnauthorized = _.get(err, 'response.status') === 401;

      const errorMessage = isUnauthorized ? (
        <UnauthorizedErrorMessage />
      ) : (
        _.get(err, 'response.data.message', err.message)
      );

      this.setState({
        errorMessage
      });
    };

    onErrorClose = () => {
      this.setState({
        errorMessage: ''
      });
    };

    render() {
      return (
        <>
          <ErrorMessage
            isShow={!!this.state.errorMessage}
            errorMessage={this.state.errorMessage}
            onClose={this.onErrorClose}
          />

          <WrappedComponent
            {...this.props}
            errorMessage={this.state.errorMessage}
            setErrorMessage={this.setErrorMessage}
          />
        </>
      );
    }
  };
};

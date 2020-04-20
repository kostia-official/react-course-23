import React from 'react';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import _ from 'lodash';
import { UnauthorizedErrorMessage } from '../components/UnauthorizedErrorMessage/UnauthorizedErrorMessage';
import { NotFound } from '../components/NotFound/NotFound';

export const withError = (WrappedComponent) => {
  return class extends React.Component {
    setErrorMessage = (err) => {
      console.error(err);

      const status = _.get(err, 'response.status');
      const isUnauthorized = status === 401;
      const isNotFound = status === 404;

      if (isNotFound) {
        this.setState({
          isNotFound
        });
        return;
      }

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
        <div>
          {this.state.isNotFound && <NotFound errorMessage="Уроки не найдены" />}
          <ErrorMessage
            isShow={!!this.props.errorMessage}
            errorMessage={this.props.errorMessage}
            onClose={this.onErrorClose}
          />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

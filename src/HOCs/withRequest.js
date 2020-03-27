import React from 'react';
import { withErrorMessage } from './withErrorMessage';
import { withLoader } from './withLoader';

export const withRequest = (WrappedComponent) => {
  class WithRequest extends React.Component {
    handleRequest = async (fn) => {
      try {
        this.props.setIsLoading(true);

        fn && (await fn());
      } catch (err) {
        this.props.setErrorMessage(err);
      } finally {
        this.props.setIsLoading(false);
      }
    };

    render() {
      return <WrappedComponent {...this.props} handleRequest={this.handleRequest} />;
    }
  }

  return withErrorMessage(withLoader(WithRequest));
};

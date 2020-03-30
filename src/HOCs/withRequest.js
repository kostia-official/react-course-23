import { withError } from './withError';
import { withLoader } from './withLoader';
import React from 'react';

export const withRequest = (WrappedComponent) => {
  class WrapperComponent extends React.Component {
    request = async (fn) => {
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
      return <WrappedComponent {...this.props} request={this.request} />;
    }
  }

  return withError(withLoader(WrapperComponent));
};

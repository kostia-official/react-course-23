import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export class ErrorMessage extends React.Component {
  render() {
    const { isShow, onClose, errorMessage } = this.props;

    return (
      <Snackbar
        open={isShow}
        autoHideDuration={6000}
        onClose={onClose}
        transitionDuration={{ exit: 0 }}
      >
        <Alert severity="error" onClose={onClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    );
  }
}

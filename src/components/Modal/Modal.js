import React from "react";
import { Card } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./Modal.module.scss";
import IconButton from "@material-ui/core/IconButton";

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div>
        <div className={styles.overlay} onClick={this.props.onClose} />
        <Card className={styles.modal}>
          <IconButton aria-label="delete" onClick={this.props.onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          {this.props.children}
        </Card>
      </div>
    );
  }
}

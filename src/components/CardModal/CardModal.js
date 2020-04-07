import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './CardModal.module.scss';
import { FadeTransition } from '../../transitions/FadeTransition/FadeTransition';

export class CardModal extends React.Component {
  render() {
    return (
      <FadeTransition isShow={this.props.isShow}>
        <div className={styles.cardModalContainer}>
          <div className={styles.overlay} onClick={this.props.onClose} />
          <Card className={styles.modal}>
            <IconButton onClick={this.props.onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
            {this.props.children}
          </Card>
        </div>
      </FadeTransition>
    );
  }
}

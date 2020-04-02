import React from 'react';
import styles from '../../styles/FadeTransition.module.scss';
import * as PropTypes from 'prop-types';

export class BicycleFadeTransition extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { children, isShow } = this.props;
    return <div className={isShow ? styles.enterActive : styles.enter}>{children}</div>;
  }
}

BicycleFadeTransition.propTypes = {
  children: PropTypes.any,
  isShow: PropTypes.any
};

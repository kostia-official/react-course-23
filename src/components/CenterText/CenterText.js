import React from "react";
import styles from "./CenterText.module.scss";

export const CenterText = props => {
  return <div className={styles.textCenter}>{props.children}</div>;
};

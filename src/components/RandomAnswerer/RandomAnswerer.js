import React from "react";
import _ from "lodash";
import titles from "../../titles";
import PropTypes from "prop-types";

import styles from "./RandomAnswerer.module.scss";

export const RandomAnswerer = props => {
  const wantsToAnswer = _.sample(props.answerers);
  const randomTitle = _.sample(titles);

  return (
    <>
      <h2>{randomTitle}</h2>
      <span id="answerer" className={styles.hide}>
        {wantsToAnswer.name}
      </span>
      <button id="show-button" onClick={show}>
        Показать
      </button>
    </>
  );
};

function show() {
  const answerer = document.getElementById("answerer");
  answerer.className = "";

  const showButton = document.getElementById("show-button");
  showButton.className = styles.hide;
}

RandomAnswerer.propTypes = {
  answerers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

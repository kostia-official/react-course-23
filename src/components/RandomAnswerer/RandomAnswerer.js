import React from "react";
import _ from "lodash";
import titles from "../../titles";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./RandomAnswerer.module.scss";

export const RandomAnswerer = props => {
  const wantsToAnswer = _.sample(props.answerers);
  const randomTitle = _.sample(titles);

  return (
    <div>
      <b className={styles.randomAnswererTitle}>{randomTitle}: </b>
      <span
        id="random-answerer"
        className={cn(styles.randomAnswerer, styles.hide)}
      >
        {wantsToAnswer.name}
      </span>
      <button
        id="show-button"
        onClick={() => {
          const nameElement = document.getElementById("random-answerer");
          nameElement.className = _.replace(
            nameElement.className,
            styles.hide,
            ""
          );

          const buttonElement = document.getElementById("show-button");
          buttonElement.className = styles.hide;
        }}
      >
        Показать
      </button>
    </div>
  );
};

RandomAnswerer.propTypes = {
  answerers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

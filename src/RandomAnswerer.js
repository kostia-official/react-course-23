import React from "react";
import _ from "lodash";
import titles from "./titles";
import PropTypes from "prop-types";

export const RandomAnswerer = props => {
  const wantsToAnswer = _.sample(props.answerers);
  const randomTitle = _.sample(titles);

  return (
    <>
      <h2>{randomTitle}</h2>
      <h3>{wantsToAnswer.name}</h3>
    </>
  );
};

RandomAnswerer.propTypes = {
  answerers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

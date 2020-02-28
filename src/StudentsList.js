import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export const StudentsList = ({ students, title = "Список студентов:" }) => {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {_.map(students, ({ name }, i) => {
          return <li key={i}>{name}</li>;
        })}
      </ul>
    </>
  );
};

StudentsList.defaultProps = {
  title: "Список студентов:"
};

StudentsList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  title: PropTypes.string
};

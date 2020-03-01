import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Title } from "../Title/Title";
import { CenterText } from "../CenterText/CenterText";

const ListItem = styled.li`
  list-style: square;
`;

export const StudentsList = ({ students, title = "Список студентов:" }) => {
  return (
    <div className="students-list-container">
      <CenterText>
        <Title>{title}</Title>
      </CenterText>
      <ul>
        {_.map(students, ({ name }, i) => {
          return <ListItem key={i}>{name}</ListItem>;
        })}
      </ul>
    </div>
  );
};

StudentsList.defaultProps = {
  title: "Список студентов"
};

StudentsList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  title: PropTypes.string
};

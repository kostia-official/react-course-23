import { Paper } from "@material-ui/core";
import styles from "./AddStudent.module.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import IconButton from "@material-ui/core/IconButton";
import { Add } from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";

export class AddStudent extends React.Component {
  state = {
    selectedAbsentStudentId: ""
  };

  render() {
    const { onAddStudent, absentStudents } = this.props;
    const selectedStudent = _.find(absentStudents, {
      id: this.state.selectedAbsentStudentId
    });
    const selectValue = selectedStudent ? selectedStudent.id : "";

    return (
      <Paper className={styles.paper}>
        <div className={styles.selectContainer}>
          <Select
            displayEmpty
            className={styles.select}
            onChange={event => {
              this.setState({
                selectedAbsentStudentId: event.target.value
              });
            }}
            value={selectValue}
          >
            <MenuItem value="">
              <em>Кого добавить...</em>
            </MenuItem>
            {_.map(absentStudents, ({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div>
          <IconButton
            onClick={() => {
              const toAddId = this.state.selectedAbsentStudentId;

              if (!toAddId) return;

              onAddStudent(toAddId);
              this.setState({
                selectedAbsentStudentId: ""
              });
            }}
          >
            <Add />
          </IconButton>
        </div>
      </Paper>
    );
  }
}

AddStudent.propTypes = {
  absentStudents: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onAddStudent: PropTypes.func
};

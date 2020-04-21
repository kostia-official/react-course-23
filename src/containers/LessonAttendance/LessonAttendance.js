import React from 'react';
import { StudentsTable } from '../../components/StudentsTable/StudentsTable';
import qs from 'query-string';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getLessonAttendance } from '../../actions/lessons-attendance';

const getDateFromProps = (props) => qs.parse(props.location.search)?.date;

class LessonAttendance extends React.Component {
  componentDidMount() {
    const date = getDateFromProps(this.props);

    if (_.isEmpty(this.props.students)) {
      this.props.getLessonAttendance(date);
    }
  }

  render() {
    return <StudentsTable students={this.props.students} />;
  }
}

const mapStateToProps = (state, props) => ({
  students: state.lessonsAttendance[getDateFromProps(props)] || []
});
const mapDispatchToProps = (dispatch) => ({
  getLessonAttendance: (payload) => dispatch(getLessonAttendance(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonAttendance);

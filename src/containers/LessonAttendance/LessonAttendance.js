import React from 'react';
import _ from 'lodash';
import { StudentsTable } from '../../components/StudentsTable/StudentsTable';
import qs from 'query-string';
import { getLessonAttendance } from '../../actions/lessons-attendance';
import { connect } from 'react-redux';

const getDateFromProps = (props) => qs.parse(props.location.search)?.date;

class LessonAttendance extends React.Component {
  componentDidMount() {
    const date = getDateFromProps(this.props);

    if (_.isEmpty(this.props.students)) {
      console.log('load data');
      this.props.getLessonAttendance(date);
    } else {
      console.log('use cache');
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
  getLessonAttendance: (date) => dispatch(getLessonAttendance(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonAttendance);

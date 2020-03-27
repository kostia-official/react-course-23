import React from 'react';
import _ from 'lodash';
import { StudentsList } from '../../components/StudentsList/StudentsList';
import qs from 'query-string';
import GetStudents from '../../components/GetStudents/GetStudents';

class LessonAttendance extends React.Component {
  render() {
    const { date } = qs.parse(this.props.location.search);

    return (
      <GetStudents date={date}>
        {(students) => {
          const presentStudents = _.filter(students, 'isPresent');

          return <StudentsList students={presentStudents} />;
        }}
      </GetStudents>
    );
  }
}

export default LessonAttendance;

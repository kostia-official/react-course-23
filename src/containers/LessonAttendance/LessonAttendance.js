import React from 'react';
import _ from 'lodash';
import { StudentsList } from '../../components/StudentsList/StudentsList';
import qs from 'query-string';
import { GetStudents } from '../../components/GetStudents/GetStudents';

function LessonAttendance({ location }) {
  const { date } = qs.parse(location.search);

  return (
    <GetStudents date={date}>
      {(students) => {
        const presentStudents = _.filter(students, 'isPresent');

        return <StudentsList students={presentStudents} />;
      }}
    </GetStudents>
  );
}

export default LessonAttendance;

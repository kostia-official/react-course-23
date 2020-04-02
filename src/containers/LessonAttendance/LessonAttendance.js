import React from 'react';
import _ from 'lodash';
import { StudentsTable } from '../../components/StudentsTable/StudentsTable';
import qs from 'query-string';
import { GetStudents } from '../../components/GetStudents/GetStudents';

function LessonAttendance({ location }) {
  const { date } = qs.parse(location.search);

  return (
    <GetStudents date={date}>
      {(students) => {
        const presentStudents = _.filter(students, 'isPresent');

        return <StudentsTable students={presentStudents} />;
      }}
    </GetStudents>
  );
}

export default LessonAttendance;

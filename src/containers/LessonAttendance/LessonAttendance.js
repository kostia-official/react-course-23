import React from 'react';
import _ from 'lodash';
import { UnauthorizedErrorMessage } from '../../components/UnauthorizedErrorMessage/UnauthorizedErrorMessage';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { getStudents } from '../../api';
import { StudentsList } from '../../components/StudentsList/StudentsList';
import qs from 'query-string';

class LessonAttendance extends React.Component {
  state = {
    students: [],
    isLoading: true,
    errorMessage: ''
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      const { date } = qs.parse(this.props.location.search);
      const students = await getStudents(date);
      const presentStudents = _.filter(students, 'isPresent');

      this.setState({ students: presentStudents });
    } catch (err) {
      this.setErrorMessage(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  setErrorMessage = async (err) => {
    const isUnauthorized = _.get(err, 'response.status') === 401;

    const errorMessage = isUnauthorized ? (
      <UnauthorizedErrorMessage />
    ) : (
      _.get(err, 'response.data.message', err.message)
    );

    this.setState({
      errorMessage
    });
  };

  render() {
    const { students, isLoading, errorMessage } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div>
        <ErrorMessage
          isShow={!!errorMessage}
          errorMessage={errorMessage}
          onClose={this.onErrorClose}
        />

        <StudentsList students={students} />
      </div>
    );
  }
}

export default LessonAttendance;

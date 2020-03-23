import React from 'react';
import { getStudents } from '../../api';
import { Spinner } from '../Spinner/Spinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import _ from 'lodash';
import { StudentsList } from '../StudentsList/StudentsList';
import qs from 'query-string';

export class Attendance extends React.Component {
  state = {
    students: [],
    isLoading: true,
    errorMessage: ''
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const { date } = qs.parse(this.props.location.search);
      if (!date) return;

      const students = await getStudents(date);

      this.setState({
        students: _.filter(students, (student) => student.isPresent)
      });
    } catch (err) {
      this.setErrorMessage(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  setErrorMessage = async (err) => {
    this.setState({
      errorMessage: _.get(err, 'response.data.message', err.message)
    });
  };

  render() {
    const { isLoading, errorMessage, students } = this.state;

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

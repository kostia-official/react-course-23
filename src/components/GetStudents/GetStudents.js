import React from 'react';
import { withRequest } from '../../HOCs/withRequest';
import { getStudents } from '../../api';

class GetStudentsComponent extends React.Component {
  state = {
    students: []
  };

  componentDidMount() {
    this.props.request(async () => {
      const students = await getStudents(this.props.date);

      this.setState({ students });
    });
  }

  render() {
    return <div>{this.props.children(this.state.students)}</div>;
  }
}

export const GetStudents = withRequest(GetStudentsComponent);

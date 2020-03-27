import React from 'react';
import _ from 'lodash';
import { withRequest } from '../../HOCs/withRequest';
import { getStudents } from '../../api';

class GetStudents extends React.Component {
  state = {
    students: []
  };

  async componentDidMount() {
    await this.props.handleRequest(async () => {
      const students = await getStudents(this.props.date);
      this.setState({ students });
    });
  }

  render() {
    if (_.isEmpty(this.state.students)) return <div />;

    return <div>{this.props.children(this.state.students)}</div>;
  }
}

export default withRequest(GetStudents);

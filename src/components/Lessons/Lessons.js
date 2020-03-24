import React from 'react';
import { getLessons } from '../../api';
import _ from 'lodash';
import { UnauthorizedErrorMessage } from '../UnauthorizedErrorMessage/UnauthorizedErrorMessage';
import { Spinner } from '../Spinner/Spinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';
import styled from 'styled-components';

const LessonWrapper = styled.div`
  padding: 10px;
`;

const ButtonItem = styled(ButtonBase)`
  width: 100%;
  justify-content: start;
`;

export class Lessons extends React.Component {
  state = {
    lessons: [],
    isLoading: true,
    errorMessage: ''
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const lessons = await getLessons();

      this.setState({ lessons });
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

    await this.syncStudents();
  };

  render() {
    const { lessons, isLoading, errorMessage } = this.state;

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

        <GridList cols={3} spacing={10}>
          {lessons.map(({ date }) => (
            <GridListTile key={date}>
              <Paper>
                <ButtonItem onClick={() => this.props.onClick(date)}>
                  <LessonWrapper>
                    <Typography>{date}</Typography>
                  </LessonWrapper>
                </ButtonItem>
              </Paper>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

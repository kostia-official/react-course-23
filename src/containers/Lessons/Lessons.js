import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';
import styled from 'styled-components';
import { getLessons } from '../../actions/lessons';
import { connect } from 'react-redux';

const LessonWrapper = styled.div`
  padding: 10px;
`;

const ButtonItem = styled(ButtonBase)`
  width: 100%;
  justify-content: start;
`;

class LessonsComponent extends React.Component {
  componentDidMount() {
    this.props.getLessons();
  }

  render() {
    const { lessons } = this.props;

    return (
      <div>
        <GridList cols={3} spacing={10} cellHeight="auto">
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

const mapStateToProps = (state) => ({ lessons: state.lessons });
const mapDispatchToProps = (dispatch) => ({
  getLessons: () => dispatch(getLessons())
});

const Lessons = connect(mapStateToProps, mapDispatchToProps)(LessonsComponent);

export default Lessons;

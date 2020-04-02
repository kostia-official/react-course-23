import React from 'react';
import _ from 'lodash';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import popTransition from '../../styles/PopTransition.module.scss';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';

export class StudentsList extends React.Component {
  render() {
    const { students, actionIcon, onActionClick } = this.props;
    const sortedStudents = _.orderBy(students, ['score'], ['desc']);

    return (
      <Paper>
        <List>
          <TransitionGroup exit={false}>
            {_.map(sortedStudents, (student) => (
              <CSSTransition key={student.id} timeout={500} classNames={popTransition}>
                <ListItem>
                  <ListItemText primary={student.name} secondary={`${student.score} очков`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => onActionClick(student.id)}>
                      <Icon>{actionIcon}</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </List>
      </Paper>
    );
  }
}

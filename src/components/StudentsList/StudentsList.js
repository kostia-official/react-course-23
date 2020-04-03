import React from 'react';
import _ from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import popTransition from '../../styles/PopTransition.module.scss';

export function StudentsList({ students, actionIcon, onActionClick }) {
  const sortedStudents = _.orderBy(students, ['score'], ['desc']);

  return (
    <Paper>
      <List>
        <TransitionGroup exit={false}>
          {_.map(sortedStudents, (student) => (
            <CSSTransition key={student.id} timeout={500} classNames={popTransition}>
              <ListItem key={student.id}>
                <ListItemText primary={student.name} secondary={`Очки: ${student.score}`} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onActionClick(student.id)}
                  >
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

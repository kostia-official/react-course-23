import PropTypes from 'prop-types';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from 'lodash';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

export const drawerWidth = '240px';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    [theme.breakpoints.up('sm')]: {
      top: '64px'
    }
  },
  hack: theme.mixins.toolbar,
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1
  },
  list: { width: drawerWidth },
  icon: {
    paddingLeft: theme.spacing(1)
  }
}));

export function Navigation({ isExpanded, items, onClose, onItemClick }) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isExpanded,
          [classes.drawerClose]: !isExpanded
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: isExpanded,
            [classes.drawerClose]: !isExpanded
          })
        }}
        onClose={onClose}
        open={isExpanded}
      >
        <Divider />
        <List className={classes.list}>
          {_.map(items, ({ icon, name, path }) => (
            <ListItem
              button
              key={name}
              onClick={() => {
                if (onItemClick) onItemClick(path);
                if (!isDesktop) onClose();
              }}
            >
              <ListItemIcon className={classes.icon}>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

Navigation.propTypes = {
  isExpanded: PropTypes.bool.isRequired
};

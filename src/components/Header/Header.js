import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Menu, ChevronLeft } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: { zIndex: 1000, display: 'flex' },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBarBottomMargin: theme.mixins.toolbar, // use the same height as Toolbar
  title: {
    flexGrow: 1
  }
}));

export const Header = ({ onMenuClick, onBackClick, title, isShowBack, rightContent }) => {
  const classes = useStyles();

  console.log('render header');

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={isShowBack ? onBackClick : onMenuClick}
          >
            {isShowBack ? <ChevronLeft /> : <Menu />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {rightContent}
        </Toolbar>
      </AppBar>

      {/* Toolbar is fixed. Use empty div with Toolbar height to show content below it properly */}
      <div className={classes.appBarBottomMargin} />
    </div>
  );
};

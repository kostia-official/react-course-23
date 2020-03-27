import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Menu, ChevronLeft } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: { zIndex: 1000 },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBarBottomMargin: theme.mixins.toolbar // use the same height as Toolbar
}));

export const Header = ({ onMenuClick, onBackClick, isShowBack }) => {
  const classes = useStyles();

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
          <Typography variant="h6">Кто Хочет Ответить</Typography>
        </Toolbar>
      </AppBar>

      {/* Toolbar is fixed. Use empty div with Toolbar height to show content below it properly */}
      <div className={classes.appBarBottomMargin} />
    </div>
  );
};

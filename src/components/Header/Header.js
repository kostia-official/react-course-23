import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ChevronLeft, Menu } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export const Header = ({ onNavigationIconClick }) => {
  const classes = useStyles();
  const history = useHistory();

  const isShowBackButton = history.location.pathname !== '/';

  const onBackButtonClick = () => {
    history.goBack();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={isShowBackButton ? onBackButtonClick : onNavigationIconClick}
        >
          {isShowBackButton ? <ChevronLeft /> : <Menu />}
        </IconButton>
        <Typography variant="h6">Кто Хочет Ответить</Typography>
      </Toolbar>
    </AppBar>
  );
};

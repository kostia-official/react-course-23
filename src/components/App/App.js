import React from "react";
import students from "../../students";
import { StudentsList } from "../StudentsList/StudentsList";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { RandomAnswerer } from "../RandomAnswerer/RandomAnswerer";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./App.module.scss";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Кто хочет ответить 1.0</Typography>
        </Toolbar>
      </AppBar>

      <div className={styles.content}>
        <div className={styles.studentsList}>
          <StudentsList students={students} />
        </div>

        <div className={styles.randomAnswerer}>
          <RandomAnswerer answerers={students} />
        </div>
      </div>
    </>
  );
}

export default App;

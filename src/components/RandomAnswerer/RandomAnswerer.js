import React from "react";
import _ from "lodash";
import titles from "../../data/titles";
import PropTypes from "prop-types";

import styles from "./RandomAnswerer.module.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const RandomAnswerer = props => {
  const wantsToAnswer = _.sample(props.answerers);
  const randomTitle = _.sample(titles);

  return (
    <Card className={styles.container}>
      <CardContent align="center">
        <Typography variant="h6" className={styles.title}>{randomTitle}</Typography>

        <div className={styles.answererContainer}>
          <div id="random-answerer" className={styles.hide}>
            <Typography color="textSecondary">{wantsToAnswer.name}</Typography>
          </div>

          <div id="show-button">
            <Button size="small" onClick={show}>
              Показать
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function show() {
  const nameElement = document.getElementById("random-answerer");
  nameElement.className = "";

  const buttonElement = document.getElementById("show-button");
  buttonElement.className = styles.hide;
}

RandomAnswerer.propTypes = {
  answerers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

import React from "react";
import _ from "lodash";
import titles from "../../data/titles";
import PropTypes from "prop-types";

import styles from "./RandomAnswerer.module.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const SCORES = {
  answer: 10,
  answerWithHint: 5
};

export class RandomAnswerer extends React.PureComponent {
  state = {
    isHideStudent: true,
    ...RandomAnswerer.getRandomData(this.props.answerers, titles)
  };

  generateRandomAnswerer = () => {
    this.setState(RandomAnswerer.getRandomData(this.props.answerers, titles));
  };

  static getRandomData(answerers, titles) {
    return {
      randomAnswerer: _.sample(answerers),
      randomTitle: _.sample(titles)
    };
  }

  render() {
    const { isHideStudent, randomTitle, randomAnswerer } = this.state;

    return (
      <Card>
        <div className={styles.container}>
          <CardContent align="center">
            <Typography variant="h6" className={styles.title}>
              {randomTitle}
            </Typography>

            <div className={styles.answererContainer}>
              <div
                id="random-answerer"
                className={isHideStudent ? styles.hide : ""}
              >
                <Typography color="textSecondary">
                  {randomAnswerer.name}
                </Typography>
              </div>

              <div
                id="show-button"
                className={isHideStudent ? "" : styles.hide}
              >
                <Button
                  size="small"
                  onClick={() => {
                    this.setState({
                      isHideStudent: false,
                      ...RandomAnswerer.getRandomData(
                        this.props.answerers,
                        titles
                      )
                    });
                  }}
                >
                  Показать
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
        <CardActions className={styles.actionsContainer}>
          <Button
            size="small"
            onClick={() =>
              this.props.onAnswer(randomAnswerer.id, SCORES.answer)
            }
          >
            Ответил +{SCORES.answer}
          </Button>
          <Button
            size="small"
            onClick={() =>
              this.props.onAnswer(randomAnswerer.id, SCORES.answerWithHint)
            }
          >
            Ответил с подсказкой +{SCORES.answerWithHint}
          </Button>
          <Button size="small" onClick={this.generateRandomAnswerer}>
            Следующий
          </Button>
        </CardActions>
      </Card>
    );
  }
}

RandomAnswerer.propTypes = {
  answerers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  onAnswer: PropTypes.func
};

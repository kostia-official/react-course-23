import React from "react";
import _ from "lodash";
import titles from "../../titles";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./RandomAnswerer.module.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const scores = {
  correctAnswer: 10,
  answerWithHint: 5
};

export class RandomAnswerer extends React.PureComponent {
  state = {
    isHideAnswerer: true,
    ...RandomAnswerer.getRandomData(this.props.answerers)
  };

  static getRandomData(answerers) {
    return {
      randomTitle: _.sample(titles),
      randomAnswerer: _.sample(answerers)
    };
  }

  generateNextAnswerer() {
    this.setState(RandomAnswerer.getRandomData(this.props.answerers));
  }

  showAnswerer = () => {
    this.setState({ isHideAnswerer: false });
  };

  render() {
    return (
      <Card>
        <div className={styles.contentContainer}>
          <CardContent align="center">
            <Typography variant="h6" className={styles.title}>
              {this.state.randomTitle}
            </Typography>

            <div className={styles.answererContainer}>
              <div className={cn({ [styles.hide]: this.state.isHideAnswerer })}>
                <Typography color="textSecondary">
                  {this.state.randomAnswerer.name}
                </Typography>
              </div>

              <div
                className={cn({ [styles.hide]: !this.state.isHideAnswerer })}
              >
                <Button size="small" onClick={this.showAnswerer}>
                  Показать
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
        <CardActions className={styles.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              this.props.onAnswer({
                id: this.state.randomAnswerer.id,
                score: scores.correctAnswer
              });
            }}
          >
            Ответил +{scores.correctAnswer}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              this.props.onAnswer({
                id: this.state.randomAnswerer.id,
                score: scores.answerWithHint
              });
            }}
          >
            Ответил с подсказкой +{scores.answerWithHint}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.generateNextAnswerer()}
          >
            Пропуск +0
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
  onAnswer: PropTypes.func.isRequired
};

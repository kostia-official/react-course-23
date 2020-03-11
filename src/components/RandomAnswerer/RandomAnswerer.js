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
import { CountdownSpinner } from "../CountdownSpinner/CountdownSpinner";

const SCORES = {
  answer: 10,
  answerWithHint: 5
};

export class RandomAnswerer extends React.PureComponent {
  state = {
    isShowStudent: false,
    isShowCountdown: false,
    randomTitle: this.getRandomTitle()
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props) return;

    this.setState({
      randomAnswerer: this.getRandomAnswerer(),
      isShowStudent: false
    });
  }

  generateNextRandomAnswerer = () => {
    this.setState({
      isShowCountdown: true,
      isShowStudent: false,
      randomTitle: this.getRandomTitle(),
      randomAnswerer: this.getRandomAnswerer()
    });
  };

  getRandomAnswerer() {
    return _.sample(this.props.answerers);
  }

  getRandomTitle() {
    return _.sample(titles);
  }

  startCountdown = () => {
    this.setState({
      isShowCountdown: true
    });
  };

  onCountdownFinish = () => {
    this.setState({
      isShowCountdown: false,
      isShowStudent: true
    });
  };

  render() {
    const {
      isShowStudent,
      isShowCountdown,
      randomTitle,
      randomAnswerer
    } = this.state;

    if (!randomAnswerer) return <div />;

    const isShowRevealButton = !isShowStudent && !isShowCountdown;

    return (
      <Card>
        <div className={styles.container}>
          <CardContent align="center">
            <Typography variant="h6" className={styles.title}>
              {randomTitle}
            </Typography>

            <div className={styles.answererContainer}>
              {isShowStudent && (
                <div id="random-answerer">
                  <Typography color="textSecondary">
                    {randomAnswerer.name}
                  </Typography>
                </div>
              )}

              {isShowCountdown && (
                <div>
                  <CountdownSpinner
                    timeSeconds={3}
                    onFinish={this.onCountdownFinish}
                  />
                </div>
              )}

              {isShowRevealButton && (
                <div>
                  <Button size="small" onClick={this.startCountdown}>
                    Показать
                  </Button>
                </div>
              )}
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
          <Button size="small" onClick={this.generateNextRandomAnswerer}>
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

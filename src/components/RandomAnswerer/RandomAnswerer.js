import React from 'react';
import _ from 'lodash';
import titles from '../../data/titles';
import styles from './RandomAnswerer.module.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { Countdown } from '../Countdown/Countdown';
import { FadeTransitionSwitch } from '../../transitions/FadeTransitionSwitch/FadeTransitionSwitch';

const SCORES = {
  answer: 10,
  answerWithHint: 5
};

export class RandomAnswerer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowStudent: false,
      isShowCountdown: false,
      randomTitle: this.getRandomTitle()
    };
  }

  generateRandomAnswerer = () => {
    this.setState({
      isShowCountdown: true,
      isShowStudent: false,
      randomTitle: this.getRandomTitle(),
      randomAnswerer: this.getRandomAnswerer()
    });
  };

  onCountdownFinish = () => {
    this.setState({
      isShowCountdown: false,
      isShowStudent: true
    });
  };

  showCountdown = () => {
    this.setState({
      isShowCountdown: true,
      randomAnswerer: this.getRandomAnswerer()
    });
  };

  getRandomAnswerer = () => {
    return _.sample(this.props.answerers);
  };

  getRandomTitle = () => {
    return _.sample(titles);
  };

  onAnswer = (randomAnswerer, score) => {
    if (!randomAnswerer) return;

    this.props.onAnswer(randomAnswerer.id, score);
  };

  render() {
    const { isShowStudent, isShowCountdown, randomTitle, randomAnswerer } = this.state;
    const isShowRevealButton = !isShowCountdown && !isShowStudent;

    let transitionKey;

    if (isShowStudent) {
      transitionKey = 'student';
    } else if (isShowRevealButton) {
      transitionKey = 'button';
    } else if (isShowCountdown) {
      transitionKey = 'countdown';
    }

    return (
      <Card>
        <div className={styles.container}>
          <CardContent align="center">
            <Typography variant="h6" className={styles.title}>
              {randomTitle}
            </Typography>

            <FadeTransitionSwitch transitionKey={transitionKey}>
              <div className={styles.answererContainer}>
                {isShowStudent && (
                  <div id="random-answerer">
                    <Typography color="textSecondary">
                      {randomAnswerer ? randomAnswerer.name : 'Нужно отметить присутствующих'}
                    </Typography>
                  </div>
                )}

                {isShowCountdown && <Countdown seconds={3} onFinish={this.onCountdownFinish} />}

                {isShowRevealButton && (
                  <div id="show-button">
                    <Button size="small" onClick={this.showCountdown}>
                      Показать
                    </Button>
                  </div>
                )}
              </div>
            </FadeTransitionSwitch>
          </CardContent>
        </div>
        <CardActions className={styles.actionsContainer}>
          <Button size="small" onClick={() => this.onAnswer(randomAnswerer, SCORES.answer)}>
            Ответил +{SCORES.answer}
          </Button>
          <Button size="small" onClick={() => this.onAnswer(randomAnswerer, SCORES.answerWithHint)}>
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

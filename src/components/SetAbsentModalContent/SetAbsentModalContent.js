import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import styles from './SetAbsentModalContent.module.scss';
import { VoiceControl } from '../../helpers/voice-control';

export class SetAbsentModalContent extends React.Component {
  constructor() {
    super();

    this.state = {
      studentIndex: 0,
      status: null
    };

    this.voiceControl = new VoiceControl();
  }

  getCurrentStudent = () => {
    return this.props.students[this.state.studentIndex];
  };

  nextStudent = () => {
    this.setState((state) => ({
      studentIndex: state.studentIndex + 1,
      status: null
    }));
  };

  onSetAbsentClick = () => {
    const student = this.getCurrentStudent();
    if (!student) return;

    this.props.setAbsentStatus(student.id);
    this.nextStudent();
  };

  onSetPresentClick = () => {
    const student = this.getCurrentStudent();
    if (!student) return;

    this.props.setPresentStatus(student.id);
    this.nextStudent();
  };

  runVoiceControl = () => {
    const student = this.getCurrentStudent();
    if (!student) return;

    this.voiceControl.speak({
      text: student.name
    });

    this.voiceControl.listen({
      text: 'есть',
      onRecognize: () => this.setState({ status: 'present' }),
      onTimeout: () => this.setState({ status: 'absent' })
    });

    // this.voiceControl.clearListeners();
  };

  componentDidMount() {
    this.runVoiceControl();
  }

  componentWillUnmount() {
    this.voiceControl.clearListeners();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.studentIndex !== this.state.studentIndex) {
      this.runVoiceControl();
    }
  }

  render() {
    const student = this.getCurrentStudent();

    return (
      <div>
        <CardContent className={styles.container}>
          <Typography variant="h5">{student ? student.name : 'Готово'}</Typography>
        </CardContent>
        {student && (
          <CardActions className={styles.buttonsWrapper}>
            <Button
              size="small"
              color={this.state.status === 'absent' ? 'primary' : 'default'}
              onClick={this.onSetAbsentClick}
            >
              Отсутствует
            </Button>
            <Button
              size="small"
              color={this.state.status === 'present' ? 'primary' : 'default'}
              onClick={this.onSetPresentClick}
            >
              Присутствует
            </Button>
          </CardActions>
        )}
      </div>
    );
  }
}

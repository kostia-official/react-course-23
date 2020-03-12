import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import styles from "./SetAbsentModalContent.module.scss";
import { VoiceControl } from "../../helpers/voice-control";

export class SetAbsentModalContent extends React.PureComponent {
  state = {
    currentStudentIndex: 0
  };

  voiceControl = new VoiceControl();

  onAbsentClick = () => {
    this.props.onSetAbsentStatus(this.getCurrentStudent().id);
    this.nextStudent();
  };

  onPresentClick = () => {
    this.props.onSetPresentStatus(this.getCurrentStudent().id);
    this.nextStudent();
  };

  nextStudent = () => {
    this.setState(state => {
      return {
        currentStudentIndex: state.currentStudentIndex + 1,
        status: null
      };
    });

    this.voiceControl.clearListeners();
  };

  getCurrentStudent = () => {
    return this.props.students[this.state.currentStudentIndex];
  };

  runVoiceControl = () => {
    const currentStudent = this.getCurrentStudent();
    if (!currentStudent) return;

    this.voiceControl.speak({
      text: currentStudent.name
    });

    this.voiceControl.listen({
      text: "есть",
      onRecognize: () => this.setState({ status: "present" }),
      onTimeout: () => this.setState({ status: "absent" })
    });
  };

  componentDidMount() {
    this.runVoiceControl();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentStudentIndex !== this.state.currentStudentIndex) {
      this.runVoiceControl();
    }
  }

  componentWillUnmount() {
    this.voiceControl.clearListeners();
  }

  render() {
    const currentStudent = this.getCurrentStudent();

    return (
      <>
        <CardContent className={styles.contentContainer}>
          <Typography variant="h5" gutterBottom>
            {currentStudent ? currentStudent.name : "Готово"}
          </Typography>
        </CardContent>

        {currentStudent && (
          <CardActions className={styles.actionsContainer}>
            <Button
              size="small"
              color={this.state.status === "absent" ? "primary" : "default"}
              onClick={this.onAbsentClick}
            >
              Отсутствует
            </Button>
            <Button
              size="small"
              color={this.state.status === "present" ? "primary" : "default"}
              onClick={this.onPresentClick}
            >
              Присутствует
            </Button>
          </CardActions>
        )}
      </>
    );
  }
}

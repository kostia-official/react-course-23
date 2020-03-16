import React from "react";
import { InputBase } from "@material-ui/core";
import _ from "lodash";

export class ControlledInput extends React.Component {
  state = {
    value: this.props.value
  };

  debouncedOnValueUpdated = _.debounce(
    updatedScore => this.props.onValueUpdated(updatedScore),
    1000
  );

  onChange = e => {
    const newValue = e.target.value;
    this.setState({ value: newValue });

    this.debouncedOnValueUpdated(newValue);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value });
    }
  }

  render() {
    return (
      <InputBase
        type={this.props.type}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

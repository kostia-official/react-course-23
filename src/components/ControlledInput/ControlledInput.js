import React from "react";
import _ from "lodash";
import { InputBase } from "@material-ui/core";

export class ControlledInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  debouncedValueUpdate = _.debounce(
    value => this.props.onValueUpdate(value),
    1000
  );

  onChange = e => {
    this.setState({
      value: e.target.value
    });
    this.debouncedValueUpdate(e.target.value);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      });
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

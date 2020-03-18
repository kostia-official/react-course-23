import React from 'react';

export class Persist extends React.Component {
  componentDidMount() {
    const data = window.localStorage.getItem(this.props.name);

    this.props.onMount(JSON.parse(data));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // _.isEqual()
    const data = JSON.stringify(this.props.data);
    const prevData = JSON.stringify(prevProps.data);

    if (data !== prevData) {
      const data = JSON.stringify(this.props.data);

      window.localStorage.setItem(this.props.name, data);
    }
  }

  render() {
    return null;
  }
}

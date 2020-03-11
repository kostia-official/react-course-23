import React from "react";
import _ from "lodash";

export class Persist extends React.Component {
  persist = _.debounce(data => {
    window.localStorage.setItem(this.props.name, data);
  }, this.props.debounce);

  componentDidMount() {
    const data = window.localStorage.getItem(this.props.name);
    if (data) {
      this.props.onMount(JSON.parse(data));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // _.isEqual
    const prevData = JSON.stringify(prevProps.data);
    const data = JSON.stringify(this.props.data);

    if (prevData !== data) {
      this.persist(data);
    }
  }

  render() {
    return null;
  }
}

Persist.defaultProps = {
  debounce: 500
};

import React from "react";
import faker from "faker";

export class Paragraph extends React.Component {
  state = {
    words: this.props.text.split(" ").map(word => {
      return {
        word,
        id: faker.random.uuid()
      };
    })
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.src !== this.props.src;
  }

  render() {
    return (
      <div>
        {this.state.words.map(({ id, word }) => (
          <span key={id}>
            <span>{word}</span>
            <span> </span>
          </span>
        ))}
      </div>
    );
  }
}

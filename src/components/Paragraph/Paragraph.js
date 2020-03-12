import React from "react";
import faker from "faker";

export class Paragraph extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.src !== this.props.src;
  }

  render() {
    const words = this.props.text.split(" ").map(word => {
      return {
        word,
        id: faker.random.uuid()
      };
    });

    return (
      <div>
        {words.map(({ id, word }) => (
          <span key={id}>
            <span>{word}</span>
            <span> </span>
          </span>
        ))}
      </div>
    );
  }
}

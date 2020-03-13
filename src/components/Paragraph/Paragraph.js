import React from "react";
import faker from "faker";

export class Paragraph extends React.PureComponent {
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

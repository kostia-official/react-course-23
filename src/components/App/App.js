import React from "react";
import { Paragraph } from "../Paragraph/Paragraph";
import faker from "faker";

export class App extends React.Component {
  state = {
    paragraphs: Array(1000) // can be lodash _.times
      .fill()
      .map(() => {
        return {
          id: faker.random.uuid(),
          text: faker.lorem.paragraph()
        };
      })
  };

  shuffle = () => {
    this.setState(state => {
      return {
        paragraphs: state.paragraphs.sort(() => Math.random() - 0.5) // can be lodash _.shuffle
      };
    });
  };

  shouldComponentUpdate() {
    console.time("app render");

    return true;
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.shuffle}>Перемешать</button>
        </div>

        {this.state.paragraphs.map(paragraph => {
          return <Paragraph text={paragraph.text} key={paragraph.id} />;
        })}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.timeEnd("app render");
  }
}

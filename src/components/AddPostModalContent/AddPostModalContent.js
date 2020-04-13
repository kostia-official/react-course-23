import React, { Fragment } from 'react';
import { CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class AddPostModalContent extends React.Component {
  state = {
    imageUrl: ''
  };

  onUrlChange = (e) => this.setState({ imageUrl: e.target.value });

  render() {
    const { imageUrl } = this.state;
    const { onAdd } = this.props;

    return (
      <Fragment>
        <CardContent>
          <TextField value={imageUrl} placeholder="Image URL" onChange={this.onUrlChange} />
          <Button size="small" onClick={() => onAdd(imageUrl)}>
            Add
          </Button>
        </CardContent>
      </Fragment>
    );
  }
}

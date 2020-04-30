import React from 'react';
import { CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class AddPostModalContent extends React.Component {
  state = {
    imageUrl: ''
  };

  onImageUrlChange = (e) => {
    this.setState({ imageUrl: e.target.value });
  };

  render() {
    const { onAdd } = this.props;
    const { imageUrl } = this.state;

    return (
      <CardContent>
        <TextField value={imageUrl} onChange={this.onImageUrlChange} placeholder="Image URL" />
        <Button size="small" onClick={() => onAdd(imageUrl)}>
          Add
        </Button>
      </CardContent>
    );
  }
}

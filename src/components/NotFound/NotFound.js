import React from 'react';
import Typography from '@material-ui/core/Typography';
import { CenterText } from '../CenterText/CenterText';

export class NotFound extends React.Component {
  render() {
    return (
      <CenterText>
        <img src="https://media3.giphy.com/media/RHzqdZJztOu7S/source.gif" alt="Not found" />
        <Typography>{this.props.errorMessage || 'Страница не найдена'}</Typography>
      </CenterText>
    );
  }
}

import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Container = styled.div`
  position: fixed;
  bottom: 15px;
  right: 15px;
`;

export const FloatingAddButton = ({ onClick }) => {
  return (
    <Container>
      <Fab color="primary" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Container>
  );
};

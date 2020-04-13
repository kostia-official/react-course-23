import React from 'react';
import GridList from '@material-ui/core/GridList';
import styled from 'styled-components';

const GridListStyled = styled(GridList)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PostsContainer = ({ children }) => {
  return <GridListStyled>{children}</GridListStyled>;
};

import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const GridListTileStyled = styled(GridListTile)`
  height: 350px;
`;

const Image = styled.img`
  width: auto;
  height: 350px;
`;

export const Post = ({ post, toggleLike }) => {
  return (
    <GridListTileStyled>
      <Image src={post.imageUrl} alt={post.id} />
      <GridListTileBar
        title={post.likes}
        actionIcon={
          <IconButton>{post.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>
        }
        onClick={() => toggleLike(post.id)}
        actionPosition="left"
      />
    </GridListTileStyled>
  );
};

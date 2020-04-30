import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AddPostModalContent } from '../../components/AddPostModalContent/AddPostModalContent';
import { addPost } from '../../actions/posts';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

class AddPostClass extends React.Component {
  onAddPost = (imageUrl) => {
    this.props.addPost({ imageUrl });
    this.props.history.push('/');
  };
  render() {
    return (
      <Container>
        <AddPostModalContent onAdd={this.onAddPost} />
      </Container>
    );
  }
}

const actionCreators = { addPost };

export const AddPost = connect(null, actionCreators)(AddPostClass);

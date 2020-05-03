import React from 'react';
import { AddPostContent } from '../../components/AddPostContent/AddPostContent';
import { addPost } from '../../actions/posts';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class AddPostClass extends React.Component {
  onAddPost = async (imageUrl) => {
    const action = await this.props.addPost({ imageUrl });

    if (!action.error) {
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <Wrapper>
        <AddPostContent onAdd={this.onAddPost} />
      </Wrapper>
    );
  }
}

const actionCreators = {
  addPost
};

export const AddPost = connect(null, actionCreators)(AddPostClass);

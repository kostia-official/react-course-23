import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PostsContainer } from '../../components/PostsContainer/PostsContainer';
import { Post } from '../../components/Post/Post';
import { toggleLike, addPost } from '../../actions';
import { FloatingAddButton } from '../../components/FloatingAddButton/FloatingAddButton';
import { CardModal } from '../../components/CardModal/CardModal';
import { AddPostModalContent } from '../../components/AddPostModalContent/AddPostModalContent';

export class Posts extends React.Component {
  state = {
    isShowModal: false
  };

  openModal = () => {
    this.setState({ isShowModal: true });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { posts, toggleLike, addPost, user } = this.props;

    return (
      <Fragment>
        <PostsContainer>
          {posts.map((post) => (
            <Post key={post.id} post={post} onToggleLike={() => toggleLike(post.id)} />
          ))}
        </PostsContainer>

        <CardModal isShow={this.state.isShowModal} onClose={this.closeModal}>
          <AddPostModalContent onAdd={(imageUrl) => addPost({ imageUrl, userId: user.id })} />
        </CardModal>

        <FloatingAddButton onClick={this.openModal} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  toggleLike: (id) => dispatch(toggleLike(id)),
  addPost: (imageUrl) => dispatch(addPost(imageUrl))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

import React from 'react';
import { connect } from 'react-redux';
import { PostsWrapper } from '../../components/PostsWrapper/PostsWrapper';
import { Post } from '../../components/Post/Post';
import { FloatingAddButton } from '../../components/FloatingAddButton/FloatingAddButton';
import { AddPostModalContent } from '../../components/AddPostModalContent/AddPostModalContent';
import { CardModal } from '../../components/CardModal/CardModal';
import { addPost, toggleLike } from '../../actions/posts';

class HomeComponent extends React.Component {
  state = {
    isShow: false
  };

  openModal = () => this.setState({ isShow: true });

  closeModal = () => this.setState({ isShow: false });

  render() {
    const { posts, user, addPost, toggleLike } = this.props;
    const { isShow } = this.state;

    return (
      <div>
        <PostsWrapper>
          {posts.map((post) => (
            <Post key={post.id} post={post} toggleLike={(postId) => toggleLike(postId)} />
          ))}
        </PostsWrapper>
        <CardModal isShow={isShow} onClose={this.closeModal}>
          <AddPostModalContent onAdd={(imageUrl) => addPost(imageUrl, user.id)} />
        </CardModal>
        <FloatingAddButton onClick={this.openModal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (...args) => dispatch(addPost(...args)),
  toggleLike: (...args) => dispatch(toggleLike(...args))
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PostsWrapper } from '../../components/PostsWrapper/PostsWrapper';
import { Post } from '../../components/Post/Post';
import { FloatingAddButton } from '../../components/FloatingAddButton/FloatingAddButton';
import { AddPostModalContent } from '../../components/AddPostModalContent/AddPostModalContent';
import { CardModal } from '../../components/CardModal/CardModal';
import { addPost, toggleLike, getPosts } from '../../actions/posts';
import { getUser } from '../../actions/user';

class HomeComponent extends React.Component {
  state = {
    isShow: false
  };

  componentDidMount() {
    this.props.getPosts();
    this.props.getUser();
  }

  openModal = () => this.setState({ isShow: true });

  closeModal = () => this.setState({ isShow: false });

  render() {
    const { posts, user, addPost, toggleLike, isLoading } = this.props;
    const { isShow } = this.state;

    if (isLoading) return 'Loading...';

    return (
      <div>
        <PostsWrapper>
          {_.map(posts, (post) => (
            <Post key={post.id} post={post} toggleLike={(postId) => toggleLike({ postId })} />
          ))}
        </PostsWrapper>
        <CardModal isShow={isShow} onClose={this.closeModal}>
          <AddPostModalContent onAdd={(imageUrl) => addPost({ imageUrl, userId: user.id })} />
        </CardModal>
        <FloatingAddButton onClick={this.openModal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  posts: state.posts.data,
  isLoading: state.posts.isLoading || state.user.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (payload) => dispatch(addPost(payload)),
  toggleLike: (payload) => dispatch(toggleLike(payload)),
  getUser: () => dispatch(getUser()),
  getPosts: () => dispatch(getPosts())
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

import React from 'react';
import { connect } from 'react-redux';
import { PostsWrapper } from '../../components/PostsWrapper/PostsWrapper';
import { Post } from '../../components/Post/Post';
import { FloatingAddButton } from '../../components/FloatingAddButton/FloatingAddButton';
import { AddPostModalContent } from '../../components/AddPostModalContent/AddPostModalContent';
import { CardModal } from '../../components/CardModal/CardModal';
import { getPosts, addPost, toggleLike } from '../../actions/posts';
import { getUser } from '../../actions/user';
import { getPostsWithIsLikes } from '../../reducers/posts';

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
    const { posts, addPost, toggleLike, isLoading } = this.props;
    const { isShow } = this.state;

    if (isLoading) return 'Loading...';

    return (
      <div>
        <PostsWrapper>
          {posts.map((post) => (
            <Post key={post.id} post={post} toggleLike={(postId) => toggleLike({ postId })} />
          ))}
        </PostsWrapper>
        <CardModal isShow={isShow} onClose={this.closeModal}>
          <AddPostModalContent onAdd={(imageUrl) => addPost({ imageUrl })} />
        </CardModal>
        <FloatingAddButton onClick={this.openModal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getPostsWithIsLikes(state),
  isLoading: state.posts.isLoading || state.user.isLoading
});

const actionCreators = {
  getPosts,
  getUser,
  addPost,
  toggleLike
};

export const Home = connect(mapStateToProps, actionCreators)(HomeComponent);

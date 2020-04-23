import React from 'react';
import { connect } from 'react-redux';
import { PostsWrapper } from '../../components/PostsWrapper/PostsWrapper';
import { Post } from '../../components/Post/Post';
import { FloatingAddButton } from '../../components/FloatingAddButton/FloatingAddButton';
import { AddPostModalContent } from '../../components/AddPostModalContent/AddPostModalContent';
import { CardModal } from '../../components/CardModal/CardModal';
import { getPosts } from '../../actions/posts';
import { getUser } from '../../actions/user';
import { posts, getPostsWithIsLiked } from '../../reducers/posts';
import { getUserId } from '../../reducers/user';

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
    const { posts, userId, addPost, toggleLike, isLoading } = this.props;
    const { isShow } = this.state;

    if (isLoading) return 'Loading...';

    return (
      <div>
        <PostsWrapper>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              toggleLike={(postId) => toggleLike({ postId, userId })}
            />
          ))}
        </PostsWrapper>
        <CardModal isShow={isShow} onClose={this.closeModal}>
          <AddPostModalContent onAdd={(imageUrl) => addPost({ imageUrl, userId })} />
        </CardModal>
        <FloatingAddButton onClick={this.openModal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  posts: getPostsWithIsLiked(state),
  isLoading: state.posts.isLoading || state.user.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (...args) => dispatch(posts.actions.addPost(...args)),
  toggleLike: (...args) => dispatch(posts.actions.toggleLike(...args)),
  getPosts: () => dispatch(getPosts()),
  getUser: () => dispatch(getUser())
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

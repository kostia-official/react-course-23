import React from 'react';
import { connect } from 'react-redux';
import { PostsWrapper } from '../../components/PostsWrapper/PostsWrapper';
import { Post } from '../../components/Post/Post';
import { FloatingAddButton } from '../../components/FloatingAddButton/FloatingAddButton';
import { AddPostModalContent } from '../../components/AddPostModalContent/AddPostModalContent';
import { CardModal } from '../../components/CardModal/CardModal';
import { getPosts, addPost } from '../../actions/posts';
import { posts, getPostsWithIsLiked } from '../../reducers/posts';

class HomeComponent extends React.Component {
  state = {
    isShow: false
  };

  componentDidMount() {
    this.props.getPosts();
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
          <AddPostModalContent onAdd={(imageUrl) => addPost({ imageUrl })} />
        </CardModal>
        <FloatingAddButton onClick={this.openModal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.data?.id,
  posts: getPostsWithIsLiked(state),
  isLoading: state.posts.isLoading || state.user.isLoading
});

const actionCreators = {
  getPosts,
  addPost,
  ...posts.actions
};

export const Home = connect(mapStateToProps, actionCreators)(HomeComponent);

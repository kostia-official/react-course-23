import React from 'react';
import { connect } from 'react-redux';
import { PostsWrapper } from '../../components/PostsWrapper/PostsWrapper';
import { Post } from '../../components/Post/Post';
import { FloatingAddButton } from '../../components/FloatingAddButton/FloatingAddButton';
import { getPosts, toggleLike } from '../../actions/posts';
import { getUser } from '../../actions/user';
import { getPostsWithIsLikes } from '../../reducers/posts';

class HomeComponent extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  openAddPost = () => {
    this.props.history.push('/posts/add');
  };

  render() {
    const { posts, toggleLike, isLoading } = this.props;

    if (isLoading) return 'Loading...';

    return (
      <div>
        <PostsWrapper>
          {posts.map((post) => (
            <Post key={post.id} post={post} toggleLike={(postId) => toggleLike({ postId })} />
          ))}
        </PostsWrapper>

        <FloatingAddButton onClick={this.openAddPost} />
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
  toggleLike
};

export const Home = connect(mapStateToProps, actionCreators)(HomeComponent);

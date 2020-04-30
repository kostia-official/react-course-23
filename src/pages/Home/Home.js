import React from 'react';
import { connect } from 'react-redux';
import { PostsWrapper } from '../../components/PostsWrapper/PostsWrapper';
import { Post } from '../../components/Post/Post';
import { FloatingAddButton } from '../../components/FloatingAddButton/FloatingAddButton';
import { getPosts, addPost, toggleLike } from '../../actions/posts';
import { getPostsWithIsLikes } from '../../reducers/posts';
import { withRouter } from 'react-router-dom';

class HomeComponent extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  onPostAddClick = () => {
    this.props.history.push('posts/add');
  };

  render() {
    const { posts, toggleLike } = this.props;

    return (
      <div>
        <PostsWrapper>
          {posts.map((post) => (
            <Post key={post.id} post={post} toggleLike={(postId) => toggleLike({ postId })} />
          ))}
        </PostsWrapper>
        <FloatingAddButton onClick={this.onPostAddClick} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getPostsWithIsLikes(state)
});

const actionCreators = {
  getPosts,
  addPost,
  toggleLike
};

export const Home = connect(mapStateToProps, actionCreators)(withRouter(HomeComponent));

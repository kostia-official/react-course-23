import React, { Suspense } from 'react';
import { Header } from '../../components/Header/Header';
import { Navigation } from '../../components/Navigation/Navigation';
import styled from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

const Posts = React.lazy(() => import('../Posts/Posts'));

const pages = [
  {
    name: 'Главная',
    icon: 'home',
    path: '/'
  }
];

const ContentWrapper = styled.div`
  display: flex;
`;

const PageWrapper = styled.div`
  flex-grow: 1;
  margin: 10px;
`;

class App extends React.Component {
  state = {
    isExpandedMenu: false
  };

  onMenuClick = () => {
    this.setState((state) => ({
      isExpandedMenu: !state.isExpandedMenu
    }));
  };

  onNavigationItemClick = (path) => {
    this.props.history.push(path);
  };

  onLessonClick = (date) => {
    this.props.history.push(`/lessons/attendance?date=${date}`);
  };

  onBackClick = () => {
    this.props.history.goBack();
  };

  render() {
    const { isExpandedMenu } = this.state;
    const { userLikesCount, userPostsCount } = this.props;
    const isShowBack = this.props.history.location.pathname !== '/';

    return (
      <div>
        <Header
          onMenuClick={this.onMenuClick}
          onBackClick={this.onBackClick}
          isShowBack={isShowBack}
          title="Posts"
          rightContent={
            <Typography variant="h6">
              Likes: {userLikesCount} Posts: {userPostsCount}
            </Typography>
          }
        />

        <ContentWrapper>
          <Navigation
            isExpanded={isExpandedMenu}
            items={pages}
            onClose={this.onMenuClick}
            onItemClick={this.onNavigationItemClick}
          />

          <PageWrapper>
            <Suspense fallback={<div />}>
              <Switch>
                <Route path="/" exact component={Posts} />
              </Switch>
            </Suspense>
          </PageWrapper>
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLikesCount: _.reduce(
    state.posts,
    (count, post) => {
      if (post.isLiked) return count + 1;

      return count;
    },
    0
  ),
  userPostsCount: _.reduce(
    state.posts,
    (count, post) => {
      if (post.userId === state.user.id) return count + 1;

      return count;
    },
    0
  )
});

export default connect(mapStateToProps)(withRouter(App));

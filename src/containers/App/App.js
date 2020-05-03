import React, { Suspense } from 'react';
import { Header } from '../../components/Header/Header';
import { Navigation } from '../../components/Navigation/Navigation';
import styled from 'styled-components';
import { Persist } from '../../components/Persist/Persist';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import { UserPanel } from '../UserPanel/UserPanel';
import { closeError } from '../../actions/user';
import { connect } from 'react-redux';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Auth } from '../../pages/Auth/Auth';
import { AddPost } from '../../pages/AddPost/AddPost';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

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

  onBackClick = () => {
    this.props.history.goBack();
  };

  render() {
    const { isExpandedMenu } = this.state;
    const isShowBack = this.props.history.location.pathname !== '/';
    const { errorMessage, closeError } = this.props;

    return (
      <div>
        <Header
          title="Memeization"
          onMenuClick={this.onMenuClick}
          onBackClick={this.onBackClick}
          isShowBack={isShowBack}
          rightContent={<UserPanel />}
        />

        <ErrorMessage
          errorMessage={errorMessage}
          isShow={!!errorMessage}
          onClose={() => closeError()}
        />

        <Persist name="app" data={{ isExpandedMenu }} onMount={(data) => this.setState(data)} />

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
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <PrivateRoute path="/posts/add" exact component={AddPost} />
              </Switch>
            </Suspense>
          </PageWrapper>
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.user.errorMessage
});

const actionCreators = {
  closeError
};

export default connect(mapStateToProps, actionCreators)(withRouter(App));

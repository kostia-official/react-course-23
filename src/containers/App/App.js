import React, { Suspense } from 'react';
import { Header } from '../../components/Header/Header';
import { Navigation } from '../../components/Navigation/Navigation';
import styled from 'styled-components';
import { Persist } from '../../components/Persist/Persist';
import { Route, Switch, withRouter } from 'react-router-dom';
import { NotFound } from '../../components/NotFound/NotFound';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { app } from '../../reducers/app';
import { connect } from 'react-redux';
import { LoaderWrapper } from '../../components/LoaderWrapper/LoaderWrapper';

const Home = React.lazy(() => import('../Home/Home'));
const Lessons = React.lazy(() => import('../Lessons/Lessons'));
const LessonAttendance = React.lazy(() => import('../LessonAttendance/LessonAttendance'));

const pages = [
  {
    name: 'Главная',
    icon: 'home',
    path: '/'
  },
  {
    name: 'Посещаемость',
    path: '/lessons',
    icon: 'today'
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
    const { isLoading, errorMessage, closeError } = this.props;
    const isShowBack = this.props.history.location.pathname !== '/';

    return (
      <div>
        <Header
          onMenuClick={this.onMenuClick}
          onBackClick={this.onBackClick}
          isShowBack={isShowBack}
        />

        <Persist name="app" data={{ isExpandedMenu }} onMount={(data) => this.setState(data)} />

        <ErrorMessage isShow={!!errorMessage} errorMessage={errorMessage} onClose={closeError} />

        <ContentWrapper>
          <Navigation
            isExpanded={isExpandedMenu}
            items={pages}
            onClose={this.onMenuClick}
            onItemClick={this.onNavigationItemClick}
          />

          <PageWrapper>
            <LoaderWrapper isLoading={isLoading}>
              <Suspense fallback={<div />}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route
                    path="/lessons"
                    exact
                    render={(props) => <Lessons {...props} onClick={this.onLessonClick} />}
                  />
                  <Route path="/lessons/attendance" exact component={LessonAttendance} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </Suspense>
            </LoaderWrapper>
          </PageWrapper>
        </ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.app.errorMessage,
  isLoading: state.app.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  closeError: () => dispatch(app.actions.closeError())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

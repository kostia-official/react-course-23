import React from 'react';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import styled from 'styled-components';
import { Persist } from '../Persist/Persist';
import { Router, Route, Switch } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';
import { createBrowserHistory } from 'history';

const Home = React.lazy(() => import('../Home/Home'));
const Lessons = React.lazy(() => import('../Lessons/Lessons'));
const LessonAttendance = React.lazy(() => import('../LessonAttendance/LessonAttendance'));

const history = createBrowserHistory();

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
    history.push(path);
  };

  onLessonClick = (date) => {
    history.push(`/lessons/attendance?date=${date}`);
  };

  onBackClick = () => {
    history.goBack();
  };

  render() {
    const { isExpandedMenu } = this.state;

    return (
      <Router history={history}>
        <Header onMenuClick={this.onMenuClick} />

        <Persist
          name="app"
          data={{ isExpandedMenu }}
          onMount={({ isExpandedMenu }) => {
            this.setState({ isExpandedMenu });
          }}
        />

        <ContentWrapper>
          <Navigation
            isExpanded={isExpandedMenu}
            items={pages}
            onClose={this.onMenuClick}
            onItemClick={this.onNavigationItemClick}
          />

          <PageWrapper>
            <React.Suspense fallback={<div />}>
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
            </React.Suspense>
          </PageWrapper>
        </ContentWrapper>
      </Router>
    );
  }
}

export default App;

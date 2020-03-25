import React from 'react';
import Home from '../Home/Home';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import styled from 'styled-components';
import { Persist } from '../Persist/Persist';
import { Lessons } from '../Lessons/Lessons';
import { Router, Route, Switch } from 'react-router-dom';
import { LessonAttendance } from '../LessonAttendance/LessonAttendance';
import { NotFound } from '../NotFound/NotFound';
import { createBrowserHistory } from 'history';

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

        <Persist name="app" data={{ isExpandedMenu }} onMount={(data) => this.setState(data)} />

        <ContentWrapper>
          <Navigation
            isExpanded={isExpandedMenu}
            items={pages}
            onClose={this.onMenuClick}
            onItemClick={this.onNavigationItemClick}
          />

          <PageWrapper>
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
          </PageWrapper>
        </ContentWrapper>
      </Router>
    );
  }
}

export default App;

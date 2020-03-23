import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Header } from '../Header/Header';
import Home from '../Home/Home';
import styled from 'styled-components';
import { Persist } from '../Persist/Persist';
import { Lessons } from '../Lessons/Lessons';
import { Router, Route, Switch } from 'react-router-dom';
import { Attendance } from '../Attendance/Attendance';
import { NotFound } from '../NotFound/NotFound';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const routes = [
  {
    path: '/',
    component: <Home />,
    icon: 'home',
    name: 'Главная'
  },
  {
    path: '/lessons',
    component: <Lessons />,
    icon: 'today',
    name: 'Посещаемость'
  }
];

const AppContainer = styled.div`
  display: flex;
`;

const PageContainer = styled.div`
  flex-grow: 1;
  padding: 10px;
`;

export class App extends React.Component {
  state = {
    isNavigationExpanded: false
  };

  toggleNavigationExpand = () => {
    this.setState((state) => ({
      isNavigationExpanded: !state.isNavigationExpanded
    }));
  };

  onNavigationItemClick = ({ path }) => {
    history.push(path);
  };

  onLessonClick = (date) => {
    history.push(`/lessons/attendance?date=${date}`);
  };

  render() {
    const { isNavigationExpanded } = this.state;

    return (
      <>
        <Router history={history}>
          <Persist
            name="app"
            data={{ isNavigationExpanded }}
            onMount={(data) => this.setState(data)}
          />

          <Header onNavigationIconClick={this.toggleNavigationExpand} />

          <AppContainer>
            <Navigation
              onClose={this.toggleNavigationExpand}
              isExpanded={isNavigationExpanded}
              items={routes}
              // onItemClick={this.onNavigationItemClick}
            />

            <PageContainer>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/lessons"
                  exact
                  render={(props) => <Lessons {...props} onLessonClick={this.onLessonClick} />}
                />
                <Route path="/lessons/attendance" exact component={Attendance} />
                <Route path="*" component={NotFound} />
              </Switch>
            </PageContainer>
          </AppContainer>
        </Router>
      </>
    );
  }
}

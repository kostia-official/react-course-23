import React, { Suspense, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Navigation } from '../../components/Navigation/Navigation';
import styled from 'styled-components';
import { Persist } from '../../components/Persist/Persist';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { NotFound } from '../../components/NotFound/NotFound';

const Home = React.lazy(() => import('../Home/Home'));
const Lessons = React.lazy(() => import('../Lessons/LessonsHooks'));
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

const App = () => {
  const [isExpandedMenu, setIsExpandedMenu] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const onMenuClick = () => {
    setIsExpandedMenu((prevIsExpandedMenu) => !prevIsExpandedMenu);
  };

  const onNavigationItemClick = (path) => {
    history.push(path);
  };

  const onLessonClick = (date) => {
    history.push(`/lessons/attendance?date=${date}`);
  };

  const onBackClick = () => {
    history.goBack();
  };

  const isShowBack = location.pathname !== '/';

  return (
    <div>
      <Header onMenuClick={onMenuClick} onBackClick={onBackClick} isShowBack={isShowBack} />

      <Persist
        name="app"
        data={{ isExpandedMenu }}
        onMount={({ isExpandedMenu }) => setIsExpandedMenu(isExpandedMenu)}
      />

      <ContentWrapper>
        <Navigation
          isExpanded={isExpandedMenu}
          items={pages}
          onClose={onMenuClick}
          onItemClick={onNavigationItemClick}
        />

        <PageWrapper>
          <Suspense fallback={<div />}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/lessons"
                exact
                render={(props) => <Lessons {...props} onClick={onLessonClick} />}
              />
              <Route path="/lessons/attendance" exact component={LessonAttendance} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </PageWrapper>
      </ContentWrapper>
    </div>
  );
};

export default App;

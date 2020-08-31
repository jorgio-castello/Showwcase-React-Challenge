import React, { useState } from 'react';
import { UserContext, ViewsContext, Views } from '../models/App';
import User from '../models/User';
import Intro from './LandingViews/Intro';
import CreateUser from './LandingViews/CreateUser';
import Main from './Main';
import EducationModal from './EducationModal';

const App = () => {
  // User State & Context
  const [user, setUser] = useState(new User(''));
  const userContext = { user, setUser };
  // Views State & Context
  const [currentView, setCurrentView] = useState(Views.Intro);
  const viewContext = { currentView, setCurrentView, Views };
  return (
    <ViewsContext.Provider value={viewContext}>
      <Intro />
      <UserContext.Provider value={userContext}>
        <CreateUser />
        <Main />
        <EducationModal />
      </UserContext.Provider>
    </ViewsContext.Provider>
  );
}

export default App;

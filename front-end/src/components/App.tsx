import React, { useState } from 'react';
import { UserContext, ViewsContext, Views } from '../models/App';
import Intro from './LandingViews/Intro';
import CreateUser from './LandingViews/CreateUser';
import Main from './Main';

const App = () => {
  // User State & Context
  const [user, setUser] = useState('');
  const [education, setEducation] = useState([]);
  const userContext = { user, setUser, education, setEducation };
  // Views State & Context
  const [currentView, setCurrentView] = useState(Views.Intro);
  const viewContext = { currentView, setCurrentView, Views };
  return (
    <ViewsContext.Provider value={viewContext}>
      <Intro />
      <UserContext.Provider value={userContext}>
        <CreateUser />
        <Main />
      </UserContext.Provider>
    </ViewsContext.Provider>
  );
}

export default App;

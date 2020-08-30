import React, { useState } from 'react';
import { ViewsContext, Views } from '../models/App';
import Intro from './LandingViews/Intro';
import CreateUser from './LandingViews/CreateUser';

const App = () => {
  const [currentView, setCurrentView] = useState(Views.Intro);
  const context = { currentView, setCurrentView, Views };
  return (
    <ViewsContext.Provider value={context}>
      <Intro />
      <CreateUser />
    </ViewsContext.Provider>
  );
}

export default App;

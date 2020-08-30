import React, { useContext } from 'react';
import { UserContext, ViewsContext } from '../models/App';

const Main = () => {
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  const { user, setUser } = useContext(UserContext);
  if (currentView !== Views.Main) {
    return null;
  }
  return (
    <div>{user}</div>
  );
}

export default Main;
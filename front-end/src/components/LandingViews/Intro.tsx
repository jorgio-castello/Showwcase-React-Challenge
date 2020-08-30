import React, { useContext } from 'react';
import { ViewsContext } from '../../models/App';


const Intro = () => {
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  if (currentView !== Views.Intro) {
    return null;
  }

  return (
    <div>
      <h1>Hi Showwcase! Welcome To My Submission for the React Challenge!</h1>
      <p>Here are a few notes about my project:</p>
      <ul>
        <li>TBU</li>
        <li>TBU</li>
        <li>TBU</li>
        <li>TBU</li>
      </ul>
      <button type="button" onClick={() => setCurrentView(Views.CreateUser)}>Begin Demo</button>
    </div>
  );
}

export default Intro;
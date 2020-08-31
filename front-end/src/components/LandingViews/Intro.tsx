import React, { useContext, useState, SyntheticEvent } from 'react';
import { ViewsContext } from '../../models/App';

const Intro = () => {
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  const [checkbox, setCheckbox] = useState(localStorage.getItem('hideIntroScreen') ? true : false);

  if (currentView !== Views.Intro) {
    return null;
  }

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (checkbox) {
      localStorage.setItem('hideIntroScreen', 'true');
    } else {
      localStorage.removeItem('hideIntroScreen');
    }
    setCurrentView(Views.CreateUser);
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
      <form onSubmit={handleSubmit}>
        <label>
          Don't show me again
          <input id="checkboxShowwcase" type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
        </label>
        <button type="submit">Begin Demo</button>
      </form>
    </div>
  );
}

export default Intro;
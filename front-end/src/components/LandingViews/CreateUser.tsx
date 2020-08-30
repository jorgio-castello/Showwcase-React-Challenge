import React, { useContext } from 'react';
import { ViewsContext } from '../../models/App';

const CreateUser = () => {
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  if (currentView !== Views.CreateUser) {
    return null;
  }
  return (
    <div>
      <p>Hi there! Welcome to my education showcase.</p>
      <p>If you would like to go back to the intro page, press <button type="button" onClick={() => setCurrentView(Views.Intro)}>here</button></p>
      <label>
        Type your name and click "Enter" below to begin!
      <input type="text" placeholder="Your name" />
      </label>
      <button>Enter</button>
    </div>
  );
}

export default CreateUser;
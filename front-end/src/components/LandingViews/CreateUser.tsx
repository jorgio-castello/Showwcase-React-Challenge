import React, { SyntheticEvent, useContext, useState } from 'react';
import { UserContext, ViewsContext } from '../../models/App';

const CreateUser = () => {
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  const { user, setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState<string>(user);

  if (currentView !== Views.CreateUser) {
    return null;
  }

  const handleCreateUser = (e: SyntheticEvent): void => {
    e.preventDefault();
    setUser(inputValue);
    setCurrentView(Views.Main);
  }

  return (
    <form onSubmit={handleCreateUser}>
      <p>Hi there! Welcome to my education showcase.</p>
      <p>If you would like to go back to the intro page, press <button type="button" onClick={() => setCurrentView(Views.Intro)}>here</button></p>
      <label>
        Type your name and click "Enter" below to begin!
      <input
          type="text"
          placeholder="Your name"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setInputValue(e.target.value)}
          required
        />
      </label>
      <button type="submit">Enter</button>
    </form>
  );
}

export default CreateUser;
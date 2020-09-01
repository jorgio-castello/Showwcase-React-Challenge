import React, { SyntheticEvent, useContext, useState } from 'react';
import { UserContext, ViewsContext } from '../../models/App';
import User from '../../models/User';
import { CreateUserStyles } from '../../assets/styles';

const CreateUser = () => {
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  const { user, setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState(user.name);

  if (currentView !== Views.CreateUser) {
    return null;
  }

  const handleCreateUser = (e: SyntheticEvent): void => {
    e.preventDefault();
    const user = new User(inputValue);
    user.init();
    setUser(user);
    setCurrentView(Views.Main);
  }

  return (
    <div className={CreateUserStyles.container}>
      <div className={CreateUserStyles.headerContainer}>
        <h1 className={CreateUserStyles.headerTitle}>Jorge's Education Showwcase</h1>
        <h2 className={CreateUserStyles.headerMessage}>If you would like to go back to the intro page, press <button className="text-blue-500 font-light" type="button" onClick={() => setCurrentView(Views.Intro)}>here</button></h2>
      </div>
      <form className={CreateUserStyles.form} onSubmit={handleCreateUser}>
        <input
          className={CreateUserStyles.nameInput}
          type="text"
          placeholder="Your name"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setInputValue(e.target.value)}
          required
        />
        <button className={CreateUserStyles.submitButton} type="submit">Enter</button>
      </form>
    </div>
  );
}

export default CreateUser;
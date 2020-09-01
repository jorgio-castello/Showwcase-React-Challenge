import React, { useContext, useState, SyntheticEvent } from 'react';
import { ViewsContext } from '../../models/App';
import { IntroStyles } from '../../assets/styles';

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
    <div className={IntroStyles.container}>
      <div className={IntroStyles.headerContainer}>
        <h1 className={IntroStyles.headerGreeting}>Hi Showwcase!</h1>
        <h2 className={IntroStyles.headerWelcome}>Welcome To My Submission for the React Challenge!</h2>
      </div>
      <div className={IntroStyles.projectNotes}>
        <p>Here are a few notes about my project:</p>
        <ul>
          <li>– Built with React + Typescript</li>
          <li>– Autocomplete utilizes a Trie + smart-fetch / cache policy</li>
          <li>– User object is mainted in Local Storage, add an education and it will persist</li>
          <li>– User Interface design is built with TailwindCSS</li>
          <li className={IntroStyles.gitHubLink}>– <a href="https://github.com/jorgio-castello/Showwcase-React-Challenge" target="_blank">Showwcase Challenge Repository</a></li>
        </ul>
      </div>
      <form className={IntroStyles.form} onSubmit={handleSubmit}>
        <div className={IntroStyles.formFields}>
          <label>
            <input id="checkboxShowwcase" className="mr-2" type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
            <span className="text-sm">
              Don't show Intro Page again
            </span>
          </label>
        </div>
        <button className={IntroStyles.submitButton} type="submit">Begin Demo</button>
      </form>
    </div>
  );
}

export default Intro;
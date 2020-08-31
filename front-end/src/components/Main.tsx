import React, { useContext } from 'react';
import { UserContext, ViewsContext } from '../models/App';

const Main = () => {
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  const { user } = useContext(UserContext);
  if (currentView !== Views.Main) {
    return null;
  }
  return (
    <>
      <div id="header">
        <div>Welcome to {user.name}'s education page</div>
        <button type="button" onClick={() => setCurrentView(Views.EducationModal)}>Add new education</button>
      </div>
      <div id="side-panel">
        <h2>Side Panel</h2>
        {user.retrieveEducation().map((university, idx) => <a key={idx} href={`#${university.school}${idx}`}>{university.school}</a>)}
      </div>
      <div id="main-content">
        <h2>Main Content</h2>
        {user.retrieveEducation().map((university, idx) => (
          <section key={idx} id={`${university.school}${idx}`}>
            <div>{university.school}</div>
            <div>{university.startYear} - {university.endYear}</div>
            <div>{university.grade}</div>
            <div>{university.degree}</div>
            <div>{university.fieldOfStudy}</div>
            <ul>
              {university.description.map((descriptionBullet: string, idx) => <li key={idx}>{descriptionBullet}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

export default Main;
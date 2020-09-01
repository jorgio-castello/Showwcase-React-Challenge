import React, { useContext, SyntheticEvent, useEffect } from 'react';
import { UserContext, ViewsContext } from '../models/App';
import {MainStyles} from '../assets/styles';

const Main = () => {
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const refreshUser = user.getUser();
    setUser(refreshUser);
  });

  if (currentView !== Views.Main && currentView !== Views.EducationModal) {
    return null;
  }

  const handleEdit = (e: SyntheticEvent): void => {
    const educationToEdit = e.currentTarget.getAttribute('id');
    if (educationToEdit) {
      user.setEducationInFocus(educationToEdit);
      setUser(user);
      setCurrentView(Views.EducationModal);
    }
  }
  return (
    <div className={MainStyles.container}>
      <div id="header">
        <div className={MainStyles.welcomeMessage}>Welcome to {user.name}'s education page</div>
        <button className={MainStyles.createEducationButton} type="button" onClick={() => setCurrentView(Views.EducationModal)}>+Add new education</button>
      </div>
      <div className={MainStyles.sidePanelContainer}>
        <div className={MainStyles.sidePanelResponiveCondition} id="side-panel">
          {user.retrieveEducation().map((university, idx) => <a className={MainStyles.sidePanelElement} key={idx} href={`#${university.school}${idx}`}>{university.school}</a>)}
        </div>
        <div className={MainStyles.educationCardContainer} id="main-content">
          {user.retrieveEducation().map((university, idx) => (
            <section className={MainStyles.cardContainer} key={university.id} id={`${university.school}${idx}`}>
              <div className={MainStyles.cardHeaderContainer}>
                <div className={MainStyles.educationDetailsContainer}>
                  <div className={MainStyles.schoolStyles}>{university.school}</div>
                  <div className={MainStyles.degreeStyles}>
                    {university.degree} in {university.fieldOfStudy}
                  </div>
                </div>
                <div className={MainStyles.dateStyles}>{university.startYear} - {university.endYear}</div>
              </div>
              {university.description ? (
                <div className={MainStyles.descriptionStyles}>
                  "{university.description}"
                </div>
              ) : null}
              <button className={MainStyles.editButton} type="button" id={university.id} onClick={handleEdit}>Edit</button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
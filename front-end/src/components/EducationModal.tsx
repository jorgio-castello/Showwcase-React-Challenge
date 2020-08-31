import React, { ChangeEvent, useContext, useState, SyntheticEvent } from 'react';
import Education from '../models/Education';
import { UserContext, ViewsContext } from '../models/App';

const EducationModal = () => {
  const { user, setUser } = useContext(UserContext);
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);
  const [education, setEducation] = useState(user.getEducationInFocus());
  const [newDescription, setNewDescription] = useState('');

  if (currentView !== Views.EducationModal) {
    return null;
  }

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    user.updateEducation(education);
    setUser(user);
    setCurrentView(Views.Main);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputElement: string | null = e.currentTarget.getAttribute('id');
    const inputValue: string | number | null = e.target.value;
    if (inputElement && inputElement in education) {
      setEducation(prevState => ({
        ...prevState,
        [inputElement]: inputValue
      }));
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectElement: string | null = e.currentTarget.getAttribute('id');
    const selectValue: string | null = e.target.value;
    if (selectElement && selectElement in education) {
      setEducation(prevState => ({
        ...prevState,
        [selectElement]: Number(selectValue),
      }));
    }
  }

  const handleDescriptionChange = (e: SyntheticEvent): void => {
    const description = education.description;
    description.push(newDescription);
    setEducation(prevState => ({
      ...prevState,
      description,
    }));
    setNewDescription('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Education</h3>
      <label>
        Coding School / College / University / etc.
        <input id="school" type="text" placeholder="Search for your school" value={education.school} onChange={handleInputChange} required />
      </label>
      <label>
        Type of Degree or Certificate
        <input id="degree" type="text" placeholder="Enter your degree" value={education.degree} onChange={handleInputChange} required />
      </label>
      <label>
        What did you study?
        <input id="fieldOfStudy" type="text" placeholder="Enter your field of study" value={education.fieldOfStudy} onChange={handleInputChange} required />
      </label>
      <label>
        When did you start?
        <select id="startYear" value={education.startYear} onChange={handleSelectChange} required>
          {Education.generateYearOptions(1970, 2022).map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </label>
      <label>
        When did you end? (Actual or Expected)
        <select id="endYear" value={education.endYear} onChange={handleSelectChange} required>
          {Education.generateYearOptions(education.startYear, education.startYear + 10).map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </label>
      <label>
        What grade did you get? (GPA)
        <input id="grade" type="number" placeholder="Enter your grade point average" min={0} max={4} step={0.1} required value={education.grade} onChange={handleInputChange} />
      </label>
      <label>
        Description
        <input id='description' placeholder="Include any highlights of your educational experience (optional)" value={newDescription} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value)} />
        <button type="button" onClick={handleDescriptionChange}>Add Description</button>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EducationModal;
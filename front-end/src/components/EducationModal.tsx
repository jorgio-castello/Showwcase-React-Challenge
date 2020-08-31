import React, { ChangeEvent, useContext, useEffect, useState, SyntheticEvent } from 'react';
import { fetchSearchResults } from '../fetchHelpers/index';
import Education from '../models/Education';
import { universitySearch, searchCacheType } from '../models/AutoComplete';
import { TrieContext, UserContext, ViewsContext } from '../models/App';

const EducationModal = () => {
  // Contexts
  const { trie } = useContext(TrieContext);
  const { user, setUser } = useContext(UserContext);
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);

  // States
  const [education, setEducation] = useState(new Education());
  const [newDescription, setNewDescription] = useState('');
  const [universitySearchResults, setUniversitySearchResults] = useState(universitySearch);
  const [searchCache, setSearchCache] = useState(searchCacheType);

  // Effects
  useEffect(() => {
    const university = user.getEducationInFocus();
    if (university && university.id !== education.id) {
      setEducation(university);
    }
  });

  if (currentView !== Views.EducationModal) {
    return null;
  }

  const handleUniversityQuery = (query: string): void => {
    setEducation((prevState) => ({ ...prevState, school: query }));
    if (searchCache[query]) {
      setUniversitySearchResults(searchCache[query]);
      return;
    } else if (query === '') {
      setUniversitySearchResults([]);
      return;
    }

    const result = trie.find(query);
    if (result.length === 5) updateCacheAndSearchResults(query, result);
    if (result.length < 5) {
      fetchSearchResults(query)
        .then((universities: string[]) => {
          if (universities.length) {
            updateCacheAndSearchResults(query, universities);
          }
        });
    }
    if (result.length === 0) updateCacheAndSearchResults(query, [query]);
  }

  const updateCacheAndSearchResults = (query: string, result: string[]): void => {
    setSearchCache((prevState) => ({
      ...prevState,
      [query]: result
    }));
    setUniversitySearchResults(result);
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

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    user.updateEducation(education);
    setUser(user);
    setCurrentView(Views.Main);
  }

  const handleDelete = (e: SyntheticEvent): void => {
    const id = e.currentTarget.getAttribute('id');
    console.log(id);
    if (id) {
      user.deleteEducation(id);
    }
    setUser(user);
    setCurrentView(Views.Main);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Add Education</h3>
        <label>
          Coding School / College / University / etc.
        <input id="school" type="text" placeholder="Search for your school" value={education.school} onChange={(e: ChangeEvent<HTMLInputElement>) => handleUniversityQuery(e.target.value)} required />
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
          {education.id ? <button id={education.id} type="button" onClick={handleDescriptionChange}>Add Description</button> : null}
        </label>
        {education.id ? <button id={education.id} type="button" onClick={handleDelete}>Delete Education</button> : null}
        <button type="submit">Submit</button>
      </form>
      <ul>
        {universitySearchResults.map(university => <li>{university}</li>)}
      </ul>
    </>
  );
};

export default EducationModal;
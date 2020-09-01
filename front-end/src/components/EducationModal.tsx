import React, { ChangeEvent, useContext, useEffect, useState, SyntheticEvent } from 'react';
import { fetchSearchResults } from '../fetchHelpers/index';
import Education from '../models/Education';
import { universitySearch, searchCacheType } from '../models/AutoComplete';
import { TrieContext, UserContext, ViewsContext } from '../models/App';
import { ModalStyles } from '../assets/styles';

const EducationModal = () => {
  // Contexts
  const { trie } = useContext(TrieContext);
  const { user, setUser } = useContext(UserContext);
  const { currentView, setCurrentView, Views } = useContext(ViewsContext);

  // States
  const [education, setEducation] = useState(new Education());
  const [universitySearchResults, setUniversitySearchResults] = useState(universitySearch);
  const [searchCache, setSearchCache] = useState(searchCacheType);
  let buttonIdx: number | undefined;
  const [activeSearchBtnIdx, setActiveSearchBtnIdx] = useState(buttonIdx);

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

  const handleSearchKeyPress = (e: React.KeyboardEvent): void => {
    const key = e.keyCode;
    let updatedActiveSearchBtnIdx: number | undefined;
    if (universitySearchResults.length) {
      if (key === 13) handleSchoolSelection();
      else if (key === 38) { // Moving up
        if (activeSearchBtnIdx === undefined) return;
        else if (activeSearchBtnIdx === 0) updatedActiveSearchBtnIdx = undefined;
        else updatedActiveSearchBtnIdx = activeSearchBtnIdx - 1;
      }
      else if (key === 40) { // Moving down
        if (activeSearchBtnIdx === universitySearchResults.length - 1) return;
        else if (activeSearchBtnIdx === undefined) updatedActiveSearchBtnIdx = 0;
        else updatedActiveSearchBtnIdx = activeSearchBtnIdx + 1;
      }
      setActiveSearchBtnIdx(updatedActiveSearchBtnIdx);
    }
  }

  const handleSchoolSelection = (): void => {
    let school: string;
    if (activeSearchBtnIdx !== undefined) {
      school = universitySearchResults[activeSearchBtnIdx];
      setEducation((prevState) => ({
        ...prevState,
        school,
      }));
      setUniversitySearchResults([]);
    }
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
    <div className={ModalStyles.container}>
      <form className={ModalStyles.form} onSubmit={handleSubmit} autoComplete="off">
        <h3 className={ModalStyles.addEducation}>Add Education</h3>
        <div className={ModalStyles.inputContainer}>
          <input
            onKeyDown={handleSearchKeyPress}
            className={ModalStyles.inputStyling}
            id="school"
            type="text"
            placeholder="Search for your school"
            value={education.school}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleUniversityQuery(e.target.value)} required
          />
        </div>
        <div className={ModalStyles.autoCompleteContainer}>
          {universitySearchResults.map((university, idx) => (
            <button className={idx === activeSearchBtnIdx ? ModalStyles.autoCompleteActiveBtn : ModalStyles.autoCompleteInactiveBtn}>{university}</button>)
          )}
        </div>
        <div className={ModalStyles.inputContainer}>
          <input
            id="degree"
            className={ModalStyles.inputStyling}
            type="text"
            placeholder="Enter your degree"
            value={education.degree}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={ModalStyles.inputContainer}>
          <input
            id="fieldOfStudy"
            className={ModalStyles.inputStyling}
            type="text"
            placeholder="Enter your field of study"
            value={education.fieldOfStudy}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={ModalStyles.rangeContainer}>
          <label className={ModalStyles.labelStyles}>
            When did you start?
          </label>
          <select
            id="startYear"
            className={ModalStyles.rangeButton}
            value={education.startYear}
            onChange={handleSelectChange}
            required
          >
            {Education.generateYearOptions(1970, 2022).map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
        <div className={ModalStyles.rangeContainer}>
          <label className={ModalStyles.labelStyles}>
            When did you end?
          </label>
          <select
            id="endYear"
            className={ModalStyles.rangeButton}
            value={education.endYear}
            onChange={handleSelectChange}
            required
          >
            {Education.generateYearOptions(education.startYear, education.startYear + 10).map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
        <div className={ModalStyles.rangeContainer}>
          <label className={ModalStyles.labelStyles}>
            What grade did you get?
          </label>
          <input
            id="grade"
            type="number"
            className={ModalStyles.rangeButton}
            min={0.0}
            max={4.0}
            step={0.1}
            required
            value={education.grade}
            onChange={handleInputChange}
          />
        </div>
        <div className={ModalStyles.descriptionContainer}>
          <input
            id='description'
            className={ModalStyles.inputStyling}
            placeholder="Add a highlight"
            value={education.description} onChange={handleInputChange}
          />
        </div>
        <button className={ModalStyles.submitButton} type="submit">Submit</button>
        {education.id ? <button className={ModalStyles.deleteButton} id={education.id} type="button" onClick={handleDelete}>Delete</button> : null}
      </form>
    </div>
  );
};

export default EducationModal;
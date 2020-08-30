import React from 'react';
import Education from '../models/Education';

export enum Views {
  Intro,
  CreateUser,
  Main,
}

type UserContextProps = {
  user: string,
  setUser: Function,
  education: Education[],
  setEducation: Function,
}

export const UserContext = React.createContext<UserContextProps>({
  user: '',
  setUser: (name: string): void => { },
  education: [],
  setEducation: (newEducation: Education) => { }
});

export const ViewsContext = React.createContext({
  currentView: Views.Intro,
  setCurrentView: (view: number): void => { },
  Views,
});
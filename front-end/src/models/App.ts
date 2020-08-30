import React from 'react';
import User from '../models/User';

export enum Views {
  Intro,
  CreateUser,
  Main,
}

type UserContextProps = {
  user: User,
  setUser: Function,
}

export const UserContext = React.createContext<UserContextProps>({
  user: new User(''),
  setUser: (updateUser: User): void => { },
});

export const ViewsContext = React.createContext({
  currentView: Views.Intro,
  setCurrentView: (view: number): void => { },
  Views,
});
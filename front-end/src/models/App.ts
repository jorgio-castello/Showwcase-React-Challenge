import React from 'react';

export enum Views {
  Intro,
  CreateUser,
  Main,
}

export const UserContext = React.createContext({
  user: '',
  setUser: (name: string) => { },
});

export const ViewsContext = React.createContext({
  currentView: Views.Intro,
  setCurrentView: (view: number) => { },
  Views,
});
import React from 'react';

export enum Views {
  Intro,
  CreateUser,
}

export const ViewsContext = React.createContext({
  currentView: Views.Intro,
  setCurrentView: (view: number) => { },
  Views,
});
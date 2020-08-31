import React from 'react';
import User from '../models/User';
import Trie from '../models/Trie';

export enum Views {
  Intro,
  CreateUser,
  Main,
  EducationModal,
}

type TrieContextProps = {
  trie: Trie,
  setTrie: Function,
}

type UserContextProps = {
  user: User,
  setUser: Function,
}

export const TrieContext = React.createContext<TrieContextProps>({
  trie: new Trie(),
  setTrie: (trie: Trie): void => { },
});

export const UserContext = React.createContext<UserContextProps>({
  user: new User(''),
  setUser: (updateUser: User): void => { },
});

export const ViewsContext = React.createContext({
  currentView: Views.Intro,
  setCurrentView: (view: number): void => { },
  Views,
});
import React, { useState, useEffect } from 'react';
import { parse } from 'flatted';
import { getTrie } from '../fetchHelpers';
import { TrieContext, UserContext, ViewsContext, Views } from '../models/App';
import Trie from '../models/Trie';
import User from '../models/User';
import Intro from './LandingViews/Intro';
import CreateUser from './LandingViews/CreateUser';
import Main from './Main';
import EducationModal from './EducationModal';

const App = () => {
  // University Trie State & Context
  const [trie, setTrie] = useState(new Trie());
  const trieContext = { trie, setTrie };
  // User State & Context
  const [user, setUser] = useState(new User(''));
  const userContext = { user, setUser };
  // Views State & Context
  const [currentView, setCurrentView] = useState(localStorage.getItem('hideIntroScreen') ? Views.CreateUser : Views.Intro);
  const viewContext = { currentView, setCurrentView, Views };

  useEffect(() => {
    if (trie.root === null) {
      getTrie()
        .then(rawTrie => {
          const trie = parse(rawTrie);
          const universityTrie = Trie.copy(trie.root);
          setTrie(universityTrie);
        });
    }
  }, [trie]);

  return (
    <ViewsContext.Provider value={viewContext}>
      <Intro />
      <UserContext.Provider value={userContext}>
        <CreateUser />
        <Main />
        <TrieContext.Provider value={trieContext}>
          <EducationModal />
        </TrieContext.Provider>
      </UserContext.Provider>
    </ViewsContext.Provider>
  );
}

export default App;

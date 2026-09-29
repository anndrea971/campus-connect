// ***GroupsContext.js - holds the list of study groups and shares it with every screen.
// ***This file creates a React Context that holds our 
// ***list of study groups and provides helper functions
// ***like addGroup, toggleJoin, and deleteGroup
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadGroups, saveGroups } from './storage';

const GroupsContext = createContext(null);

// Provider component: loads saved groups on startup and saves them on every change
export function GroupsProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved data once when the app starts
  // ***Notice the useEffect hooks here: the first one loads saved groups
  // ***from local storage when the app boots up
  useEffect(() => {
    loadGroups().then((saved) => {
      setGroups(saved);
      setLoaded(true);
    });
  }, []);

  // Save whenever the list changes (but only after the first load finished)
  // ***and the second one(useEffect) automatically triggers a save 
  // ***whenever the groups array changes.   
  useEffect(() => {
    if (loaded) saveGroups(groups);
  }, [groups, loaded]);

  // Adds a new group to the top of the list; the creator is joined automatically
  function addGroup(group) {
    const newGroup = { ...group, id: Date.now().toString(), joined: true };
    setGroups((prev) => [newGroup, ...prev]);
  }

  // Flips a group between joined and not joined
  function toggleJoin(id) {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, joined: !g.joined } : g)));
  }

  // Removes a group from the list
  function deleteGroup(id) {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <GroupsContext.Provider value={{ groups, loaded, addGroup, toggleJoin, deleteGroup }}>
      {children}
    </GroupsContext.Provider>
  );
}

// Small helper hook so screens can read the shared data
// ***I also exported a small custom hook called useGroups()
// ***so any screen can easily pull or modify the shared state with a single line of code
export function useGroups() {
  return useContext(GroupsContext);
}

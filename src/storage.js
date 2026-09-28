// storage.js - saves and loads study groups on the phone using AsyncStorage,
// so data is still there after the app closes or the phone restarts.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'campusconnect_groups';

// Example groups shown the very first time the app opens
const SEED_GROUPS = [
  { id: '1', title: 'Calc II midterm prep', course: 'MATH 112', time: 'Tue 6:00 PM', location: 'Library room 204', joined: false },
  { id: '2', title: 'Intro to Programming help', course: 'CSE 110', time: 'Thu 4:30 PM', location: 'https://meet.example.com/cse110', joined: false },
];

// Reads groups from storage; falls back to the example groups if nothing is saved
export async function loadGroups() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : SEED_GROUPS;
  } catch (e) {
    console.log('Could not load groups', e);
    return SEED_GROUPS;
  }
}

// Writes the full list of groups to storage
export async function saveGroups(groups) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(groups));
  } catch (e) {
    console.log('Could not save groups', e);
  }
}

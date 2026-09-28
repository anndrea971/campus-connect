# Overview

As a software engineer, I wanted to get hands-on experience building a cross-platform mobile app with React Native and understand how screens, navigation, state and on-device storage fit together.

CampusConnect is a mobile app for finding and organizing study groups. You can browse groups, create a new one (title, course, time, and place or link), join or leave a group, filter to "My groups", and delete groups. Everything is saved on the phone with AsyncStorage, so your groups are still there after closing the app.

How to use it: open the app, tap a group to see its details and join it, or tap **New group** to create one. Form fields are validated and show a message if something is missing.

My purpose was to learn the React Native workflow (components, navigation, state management, persistence) and practice writing clean, commented code.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

- Visual Studio Code
- Expo (Expo Go on a phone or an Android emulator)
- Git and GitHub

Language and libraries:
- JavaScript (React Native, React hooks and Context)
- `@react-navigation/native` and `@react-navigation/native-stack` for screens
- `@react-native-async-storage/async-storage` for local persistence

# Useful Websites

* [React Native Docs](https://reactnative.dev/)
* [Expo Docs](https://docs.expo.dev/)
* [React Navigation](https://reactnavigation.org/)
* [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

# Future Work

* Local notifications for upcoming sessions
* Login and a cloud database (Firebase) so groups are shared between students
* Search and filter by course
* Edit an existing group
* Unit tests for validation

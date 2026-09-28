// App.js - entry point. Sets up the data provider and the screen navigation.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GroupsProvider } from './src/GroupsContext';
import HomeScreen from './src/screens/HomeScreen';
import CreateGroupScreen from './src/screens/CreateGroupScreen';
import GroupDetailsScreen from './src/screens/GroupDetailsScreen';

const Stack = createNativeStackNavigator();

// Root component: wraps all screens in the shared groups state
export default function App() {
  return (
    <GroupsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#1f3a5f' },
            headerTintColor: '#ffffff',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'CampusConnect' }} />
          <Stack.Screen name="CreateGroup" component={CreateGroupScreen} options={{ title: 'New study group' }} />
          <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} options={{ title: 'Group details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GroupsProvider>
  );
}

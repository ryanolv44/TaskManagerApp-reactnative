import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import UsersScreen from './src/screens/UsersScreen';
import TasksScreen from './src/screens/TasksScreen';
import UserFormScreen from './src/screens/UserFormScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="UserForm" component={UserFormScreen} />
        <Stack.Screen name="TaskForm" component={TaskFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

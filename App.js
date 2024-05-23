import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersScreen from './screens/UsersScreen';
import TasksScreen from './screens/TasksScreen';
import UserFormScreen from './screens/UserFormScreen';
import TaskFormScreen from './screens/TaskFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Users">
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="UserForm" component={UserFormScreen} />
        <Stack.Screen name="TaskForm" component={TaskFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

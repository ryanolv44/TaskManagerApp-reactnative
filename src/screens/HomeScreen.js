import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Button title="Usuarios" onPress={() => navigation.navigate('Users')} />
      <Button title="Tarefas" onPress={() => navigation.navigate('Tasks')} />
    </View>
  );
}

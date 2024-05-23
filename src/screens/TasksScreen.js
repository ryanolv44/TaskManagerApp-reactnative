import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.completed ? 'Completed' : 'Incomplete'}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('TaskForm', { task: item })} />
          </View>
        )}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('TaskForm')} />
      <Button title="View Users" onPress={() => navigation.navigate('Users')} />
    </View>
  );
}

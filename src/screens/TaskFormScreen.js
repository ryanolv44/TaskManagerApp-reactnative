import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button } from 'react-native';
import axios from 'axios';

export default function TaskFormScreen({ route, navigation }) {
  const task = route.params?.task || {};
  const [title, setTitle] = useState(task.title || '');
  const [completed, setCompleted] = useState(task.completed || false);
  const [userId, setUserId] = useState(task.userId || '');

  const handleSubmit = () => {
    const taskData = { title, completed, userId: Number(userId) };

    if (task.id) {
      axios.put(`http://localhost:4000/tasks/${task.id}`, taskData)
        .then(() => navigation.navigate('Tasks'))
        .catch(error => console.log(error));
    } else {
      axios.post('http://localhost:4000/tasks', taskData)
        .then(() => navigation.navigate('Tasks'))
        .catch(error => console.log(error));
    }
  };

  return (
    <View>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} />
      <Text>Completed</Text>
      <Switch value={completed} onValueChange={setCompleted} />
      <Text>User ID</Text>
      <TextInput value={userId.toString()} onChangeText={setUserId} />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}

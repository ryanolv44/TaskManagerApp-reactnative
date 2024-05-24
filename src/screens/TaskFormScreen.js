import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function TaskFormScreen({ route, navigation }) {
  const task = route.params?.task || {};
  const [title, setTitle] = useState(task.title || '');
  const [completed, setCompleted] = useState(task.completed || false);
  const [userId, setUserId] = useState(task.userId?.toString() || '');

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
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Completed</Text>
      <Switch
        value={completed}
        onValueChange={setCompleted}
      />
      <Text style={styles.label}>User ID</Text>
      <TextInput
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

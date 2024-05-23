import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { FAB, Card } from 'react-native-paper';
import axios from 'axios';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:4000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:4000/tasks/${id}`)
      .then(() => fetchTasks())
      .catch(error => console.log(error));
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel" },
        { text: "Delete", onPress: () => deleteTask(id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.status}>{item.completed ? 'Completed' : 'Incomplete'}</Text>
            </Card.Content>
            <Card.Actions>
              <Button title="Edit" onPress={() => navigation.navigate('TaskForm', { task: item })} />
              <Button title="Delete" onPress={() => confirmDelete(item.id)} />
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('TaskForm')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    color: 'gray',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'tomato',
  },
});

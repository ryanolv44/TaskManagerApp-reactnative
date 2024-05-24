import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
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

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>{item.completed ? 'Completed' : 'Incomplete'}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TaskForm', { task: item })}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'tomato',
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
  },
});

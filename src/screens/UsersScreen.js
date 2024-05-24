import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:4000/users/${id}`)
      .then(() => fetchUsers())
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('UserForm', { user: item })}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => deleteUser(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('UserForm')}
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
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

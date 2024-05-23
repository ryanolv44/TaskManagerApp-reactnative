import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { FAB, Card } from 'react-native-paper';
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

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel" },
        { text: "Delete", onPress: () => deleteUser(id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </Card.Content>
            <Card.Actions>
              <Button title="Edit" onPress={() => navigation.navigate('UserForm', { user: item })} />
              <Button title="Delete" onPress={() => confirmDelete(item.id)} />
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('UserForm')}
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
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

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function UserFormScreen({ route, navigation }) {
  const user = route.params?.user || {};
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');

  const handleSubmit = () => {
    const userData = { name, email };

    if (user.id) {
      axios.put(`http://localhost:4000/users/${user.id}`, userData)
        .then(() => navigation.navigate('Users'))
        .catch(error => console.log(error));
    } else {
      axios.post('http://localhost:4000/users', userData)
        .then(() => navigation.navigate('Users'))
        .catch(error => console.log(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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

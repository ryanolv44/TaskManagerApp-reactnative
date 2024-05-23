import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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
    <View>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}

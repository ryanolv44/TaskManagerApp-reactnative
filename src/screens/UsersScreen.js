import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('UserForm', { user: item })} />
          </View>
        )}
      />
      <Button title="Add User" onPress={() => navigation.navigate('UserForm')} />
      <Button title="View Tasks" onPress={() => navigation.navigate('Tasks')} />
    </View>
  );
}

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function UserFormScreen({ route, navigation }) {
  const user = route.params?.user || {};
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.match(/^[A-Za-z]+$/)) {
      newErrors.name = 'O nome deve conter apenas letras.';
    }
    if (name.length < 3) {
      newErrors.name = 'O nome deve ter pelo menos 3 letras.';
    }
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = 'Email inválido.';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const userData = { name, email };
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

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
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Salvar</Text>
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
  errorInput: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
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

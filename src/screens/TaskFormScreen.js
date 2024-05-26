import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function TaskFormScreen({ route, navigation }) {
  const task = route.params?.task || {};
  const [title, setTitle] = useState(task.title || '');
  const [completed, setCompleted] = useState(task.completed || false);
  const [userId, setUserId] = useState(task.userId?.toString() || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (title.trim().length === 0) {
      newErrors.title = 'O título é obrigatório.';
    }
    if (!/^[0-9]+$/.test(userId)) {
      newErrors.userId = 'ID de usuário inválido. Deve ser um número.';
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const taskData = { title, completed, userId: Number(userId) };
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      if (task.id) {
        await axios.put(`http://localhost:4000/tasks/${task.id}`, taskData);
      } else {
        await axios.post('http://localhost:4000/tasks', taskData);
      }
      navigation.navigate('Tasks');
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data.errors || { backend: 'Erro ao criar/atualizar a tarefa, verifique se o id do usuário é existe' };
        setErrors(backendErrors);
      } else {
        setErrors({ backend: 'Erro ao conectar ao servidor' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={[styles.input, errors.title && styles.errorInput]}
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      
      <Text style={styles.label}>Concluída</Text>
      <Switch
        value={completed}
        onValueChange={setCompleted}
      />
      
      <Text style={styles.label}>ID do Usuário</Text>
      <TextInput
        style={[styles.input, errors.userId && styles.errorInput]}
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
      />
      {errors.userId && <Text style={styles.errorText}>{errors.userId}</Text>}
      
      {errors.backend && <Text style={styles.errorText}>{errors.backend}</Text>}
      
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
    borderBottomColor: '#ccc', // Color for normal input border
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

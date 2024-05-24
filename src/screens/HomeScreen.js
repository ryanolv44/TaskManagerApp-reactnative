import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/vetores-gratis/simples-vetor-de-fundo-laranja-em-branco-para-negocios_53876-174945.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1714521600&semt=ais' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Users')}
        >
          <Text style={styles.buttonText}>Lista de Usuários</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.buttonText}>Lista de Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserForm')}
        >
          <Text style={styles.buttonText}>Criar Usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TaskForm')}
        >
          <Text style={styles.buttonText}>Criar Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: 'tomato',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

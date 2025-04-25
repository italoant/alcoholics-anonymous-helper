import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { login, error, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)/profile');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Login</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <ThemedText style={styles.buttonText}>Entrar</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.forgotPasswordButton}
        onPress={() => router.push('/forgot-password')}
      >
        <ThemedText style={styles.forgotPasswordText}>
          Esqueceu a senha?
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => router.push('/register')}
      >
        <ThemedText style={styles.registerText}>
          Não tem uma conta? Cadastre-se
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: '#e0e0e0',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 
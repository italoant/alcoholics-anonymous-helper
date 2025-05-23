import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function UpdatePasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    // Aqui você pode implementar a lógica de atualização de senha
    Alert.alert('Sucesso', 'Senha atualizada com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          router.push('/(tabs)/profile');
        }
      }
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.backButtonText}>← Voltar</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title">Atualizar Senha</ThemedText>
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Nova Senha</ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#666"
            secureTextEntry
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Confirmar Nova Senha</ThemedText>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#666"
            secureTextEntry
          />
        </ThemedView>

        <TouchableOpacity 
          style={styles.updateButton}
          onPress={handleUpdatePassword}
        >
          <ThemedText style={styles.updateButtonText}>
            Atualizar Senha
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#e0e0e0',
  },
  input: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 10,
    color: '#e0e0e0',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 